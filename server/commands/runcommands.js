const DB = require('../db')
const RunPowerShell = require('fantastic-cli/runpowershell')
const FlatUnique = require('fantastic-utils/flatunique')
const DefaultIPs = require('fantastic-utils/defaultips')
const GetPackagedData = require('../util/getpackageddata')
const RunCommand = require('./runcommand')

const run_type = (commands, result_type, host, hostname) => commands[result_type] ?
  Promise.all(commands[result_type].filter(v => v.hosts.includes(host)).map(v => RunCommand(v, hostname))).then(FlatUnique) :
  Promise.resolve([])

const run_one_of_type = async (commands, result_type, host, hostname) => {
  if (!commands[result_type]) return undefined
  const funcs = commands[result_type].filter(v => v.hosts.includes(host))
  for (const f of funcs) { // TODO: instead of just running in order we should establish a priority so we run the best commands first
    const result = await RunCommand(f, hostname)
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
  commands ? Promise.all(Object.entries(commands)
  .filter(v => v[1] != 'disabled')
  .map(v => GetPackagedData(v[0], 'commands'))) // TODO: filter out invalid scripts and warn the user
  .then(res => res.reduce((result, v) => {
    (result[v.result_type] = result[v.result_type] || []).push(v)
    return result
  }, {})) :
  Promise.resolve()

const run = async get_commands => {
  const commands = await create_commands(get_commands())
  if (!commands) {
    console.log('no host data commands found, retrying in 1s!')
    return setTimeout(() => run(get_commands), 1000)
  }
  console.log('-----gathering initial local host data...-----')
  const ids = await get_node(commands).then(res => DB.addNodes([{...res, access: 'local'}], true)) // create the initial node belonging to the local host
  const local = ids[0]
  const loop = async () => {
    console.log('-----starting host data loop...-----')
    const commands = await create_commands(get_commands())
    const remote = []
    console.log('finding hosts on network...')
    const hosts = await run_type(commands, 'hosts', 'local')
    const local_hosts = []
    const remote_hosts = []
    for (const host of hosts) {
      if (host.local) local_hosts.push(host)
      else remote_hosts.push(host)
    }
    for (const host of local_hosts) {
      await DB.updateNode(local, host, DB)
    }
    await DB.addNodes(remote_hosts)
    console.log('finished searching for hosts, finding hosts with remote access enabled...')
    const nodes = await DB.all({table: 'nodes', conditions: {columns: {important: true}}}) // "important" nodes are ones belonging to our network
    for (const node of nodes) {
      if (node.node_id === local) continue // we only want remote nodes here
      const hostname = node.hostname
      if (!hostname) continue
      const res = await RunPowerShell(`Test-WsMan ${hostname}`, undefined, false) // if Test-WsMan doesn't error it means we can run remote commands on this host             
      if (res) {
        remote.push({ id: node.node_id, hostname })
        await DB.updateNode(node.node_id, { access: 'remote' }, DB, true)
      }
    }
    console.log(`found ${remote.length} hosts with remote access enabled.`)

    await run_type(commands, 'connections', 'local').then(res => DB.addConnections(local, res))
    await get_node(commands).then(res => DB.updateNode(local, res, DB, true))
    for (const node of remote) {
      await run_type(commands, 'connections', 'remote', node.hostname).then(res => DB.addConnections(node.id, res, true))
      await get_node(commands, node.hostname).then(res => DB.updateNode(node.id, res, DB, true))
    }
    loop ()
  }

  loop()
}

module.exports = run