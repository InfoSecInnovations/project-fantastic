const DB = require('../db')
const {all} = require('../db/operations')
const RunPowerShell = require('fantastic-cli/runpowershell')
const FS = require('fs').promises
const FlatUnique = require('fantastic-utils/flatunique')
const DefaultIPs = require('fantastic-utils/defaultips')

const run_type = (commands, result_type, host, hostname) => commands[result_type] ?
  Promise.all(commands[result_type].filter(v => v.hosts.includes(host)).map(v => v.run(hostname))).then(FlatUnique) :
  []

const run_one_of_type = async (commands, result_type, host, hostname) => {
  if (!commands[result_type]) return []
  const funcs = commands[result_type].filter(v => v.hosts.includes(host))
  for (f of funcs) { // TODO: instead of just running in order we should establish a priority so we run the best commands first
    const result = await f.run(hostname)
    if (result) return result
  }
}

const remove_line_breaks = s => s && s.replace(/\r?\n|\r/g, '') // for some reason we end up with line breaks in some of the results, which can mess with commands

const get_node = async (commands, computer_name) => {
  const host = computer_name ? 'remote' : 'local' // if we didn't supply a computer name we're running this on the local machine
  const label = `${host} host ${computer_name || ''}`
  console.log(`getting host data from ${label}...`)
  const ips = FlatUnique([...await run_type(commands, 'ip_addresses', host, computer_name), ...DefaultIPs])
  console.log(`got IP Addresses from ${label}.`)
  const macs = await run_type(commands, 'mac_addresses', host, computer_name)
  console.log(`got MAC Addresses from ${label}.`)
  const os = await run_one_of_type(commands, 'os', host, computer_name)
  console.log(`got OS from ${label}.`)
  const hostname = await run_one_of_type(commands, 'hostname', host, computer_name).then(remove_line_breaks)
  console.log(`got hostname from ${label}.`)
  return {ips, macs, os, hostname, important: true}
}

const run = async () => {
  const commands = await FS.readdir('config/data_sources')
    .then(res => res.map(v => require(`../config/data_sources/${v}`)).reduce((result, v) => { // TODO: filter out invalid scripts and warn the user
      (result[v.result_type] = result[v.result_type] || []).push(v)
      return result
    }, {}))
  const ids = await get_node(commands).then(res => DB.addNodes([res], true))
  const local = ids[0]
  const loop = async () => {
    const remote = []
    console.log('finding hosts on network...')
    await run_type(commands, 'hosts', 'local')
      .then(async res => {
        for (r of res) {
          await DB.updateNode(local, r.local)
          await DB.addNodes(r.remote)
        }
      })
      .then (() => {
        console.log('finished searching for hosts, finding hosts with remote access enabled...')
        return all({table: 'nodes', conditions: {columns: {important: true}}}) // "important" nodes are ones belonging to our network
          .then(res => Promise.all(res.map(v => { // find nodes we don't already know if we can execute remote powershell commands on
            if (v.node_id === local) return // we only want remote nodes here
            const hostname = v.hostname
            if (!hostname) return
            return RunPowerShell(`Test-WsMan ${hostname}`, false)
            .then(res => {if (res) remote.push({id: v.node_id, hostname})})    
          })))
          .then(() => console.log(`found ${remote.length} hosts with remote access enabled.`))
      })
      .then(() => Promise.all([ //TODO: import these commands from config folder, run all commands grouped by type, and combine the results, then perform relevant DB operation
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