const Nmap = require('./nmap')
const GetNetTcpConnection = require('./getnettcpconnection')
const GetNetIPAddress = require('./getnetipaddress')
const GetDNSClientCache = require('./getdnsclientcache')
const GetMacAddress = require('./getmacaddress')
const GetOS = require('./getos')
const GetHostname = require('./gethostname')
const DB = require('../db')
const {all} = require('../db/operations')
const RunPowerShell = require('fantastic-cli/runpowershell')

const run_command = async (command, label, callback, hostname) => {
  if (hostname) label = `${label} on host ${hostname}`
  console.log(`getting results from ${label}...`)
  return await command(hostname)
  .then(async res => {
    await callback(res)
    console.log(`${label} results ready.`)
    return res
  })
}

// this function gets the IP Addresses of our local node which we use as our entry point into the network
const initial_node = async () => {
  console.log(`getting initial results from Get-NetIPAddress...`)
  return await GetNetIPAddress() // TODO: get all commands we can run locally and combine the results here
  .then(async res => {
    res.macs = await GetMacAddress()
    res.os = await GetOS()
    res.hostname = await GetHostname()
    const ids = await DB.addNodes([res], true)
    console.log(`initial Get-NetIPAddress results ready.`)
    return ids[0]
  })
}

const run = async () => {
  const local = await initial_node()
  const loop = () => {
    const remote = []
    return run_command(Nmap, 'nmap', res => DB.updateNode(local, res.local).then(() => DB.addNodes(res.nodes)))  
    .then (async () => {
      const nodes = await all({table: 'nodes', conditions: {columns: {important: true}}}) // "important" nodes are ones belonging to our network
      return Promise.all(nodes.map(v => { // find nodes we don't already know if we can execute remote powershell commands on
        if (v.node_id === local) return // we only want remote nodes here
        const hostname = v.hostname
        if (!hostname) return
        return RunPowerShell(`Test-WsMan ${hostname}`, false)
        .then(res => {if (res) remote.push({id: v.node_id, hostname: v.hostname})})    
      }))
    })
    .then(() => Promise.all([ //TODO: import these commands from config folder, run all commands grouped by type, and combine the results, then perform relevant DB operation
      run_command(GetNetTcpConnection, 'Get-NetTcpConnection', res => DB.addConnections(local, res)),
      run_command(GetNetIPAddress, 'Get-NetIPAddress', res => DB.updateNode(local, res)),
      run_command(GetDNSClientCache, 'Get-DnsClientCache', res => DB.updateNode(local, res)),
      ...remote.map(v => [
        run_command(GetOS, 'Get OS', res => DB.updateNode(v.id, {os: res}, true), v.hostname),
        run_command(GetMacAddress, 'Get MAC Address', res => DB.addMacs(v.id, res, true), v.hostname),
        run_command(GetNetTcpConnection, 'Get-NetTcpConnection', res => DB.addConnections(v.id, res, true), v.hostname),
        run_command(GetNetIPAddress, 'Get-NetIPAddress', res => DB.updateNode(v.id, res), v.hostname),
        run_command(GetDNSClientCache, 'Get-DnsClientCache', res => DB.updateNode(v.id, res), v.hostname)
      ]).flat()
    ]))
    .then(() => loop ())
  }

  loop()
}

module.exports = run