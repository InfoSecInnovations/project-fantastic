const DB = require('../db')
const {all} = require('../db/operations')
const RunPowerShell = require('fantastic-cli/runpowershell')
const FlatUnique = require('fantastic-utils/flatunique')
const DefaultIPs = require('fantastic-utils/defaultips')
const GetCommand = require('../util/getpackagedasset')

const run_type = (commands, result_type, host, hostname) => commands[result_type] ?
  Promise.all(commands[result_type].filter(v => v.hosts.includes(host)).map(v => v.run(hostname))).then(FlatUnique) :
  Promise.resolve([])

const run_one_of_type = async (commands, result_type, host, hostname) => {
  if (!commands[result_type]) return ''
  const funcs = commands[result_type].filter(v => v.hosts.includes(host))
  for (const f of funcs) { // TODO: instead of just running in order we should establish a priority so we run the best commands first
    const result = await f.run(hostname)
    if (result) return result
  }
}

const remove_line_breaks = s => s && s.replace(/\r?\n|\r/g, '') // for some reason we end up with line breaks in some of the results, which can mess with commands

const get_node = async (commands, computer_name) => {
  const host = computer_name ? 'remote' : 'local' // if we didn't supply a computer name we're running this on the local machine
  const label = `${host} host${computer_name ? ` ${computer_name}` : ''}`
  console.log(`getting host data from ${label}...`)
  const ips = FlatUnique([...await run_type(commands, 'ip_addresses', host, computer_name), ...DefaultIPs])
  console.log(`got IP Addresses from ${label}.`)
  const macs = await run_type(commands, 'mac_addresses', host, computer_name)
  console.log(`got MAC Addresses from ${label}.`)
  const os = await run_one_of_type(commands, 'os', host, computer_name)
  console.log(`got OS from ${label}.`)
  const hostname = await run_one_of_type(commands, 'hostname', host, computer_name).then(remove_line_breaks)
  console.log(`got hostname from ${label}.`)
  console.log(`Got data from ${label}.`)
  return {ips, macs, os, hostname, important: true}
}

const create_commands = commands => 
  Object.entries(commands)
  .filter(v => v[1])
  .map(v => {
    const source = GetCommand(v[0])
    // TODO: filter out invalid scripts and warn the user
    return source
  })
  .reduce((result, v) => {
    (result[v.result_type] = result[v.result_type] || []).push(v)
    return result
  }, {})

const run = async get_commands => {
  const commands = create_commands(get_commands())
  const ids = await get_node(commands).then(res => DB.addNodes([{...res, access: 'local'}], true)) // create the initial node belonging to the local host
  const local = ids[0]
  const loop = async () => {
    console.log('starting host data loop...')
    const commands = create_commands(get_commands())
    const remote = []
    console.log('finding hosts on network...')
    await run_type(commands, 'hosts', 'local')
      .then(async res => {
        for (const r of res) {
          await DB.updateNode(local, r.local)
          await DB.addNodes(r.remote)
        }
      })
      .then (() => {
        console.log('finished searching for hosts, finding hosts with remote access enabled...')
        return all({table: 'nodes', conditions: {columns: {important: true}}}) // "important" nodes are ones belonging to our network
          .then(res => Promise.all(res.map(v => {
            if (v.node_id === local) return // we only want remote nodes here
            const hostname = v.hostname
            if (!hostname) return
            return RunPowerShell(`Test-WsMan ${hostname}`) // if Test-WsMan doesn't error it means we can run remote commands on this host
              .then(res => {
                if (res) {
                  remote.push({id: v.node_id, hostname})
                  DB.updateNode(v.node_id, {access: 'remote'}, true)
                }
              })    
          })))
          .then(() => console.log(`found ${remote.length} hosts with remote access enabled.`))
      })
      .then(() => Promise.all([
        run_type(commands, 'connections', 'local').then(res => DB.addConnections(local, res)),
        get_node(commands).then(res => DB.updateNode(local, res, true)),
        ...remote.map(v => [
          run_type(commands, 'connections', 'remote', v.hostname).then(res => DB.addConnections(v.id, res, true)),
          get_node(commands, v.hostname).then(res => DB.updateNode(v.id, res, true))
        ]).flat()
      ]))
      .then(() => loop ())
  }

  loop()
}

module.exports = run