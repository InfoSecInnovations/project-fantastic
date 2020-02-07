const Nmap = require('./nmap')
const GetNetTcpConnection = require('./getnettcpconnection')
const GetNetIPAddress = require('./getnetipaddress')
const GetDnsClientCache = require('./getdnsclientcache')
const GetMacAddress = require('./getmacaddress')
const DB = require('../db')
const {all} = require('../db/operations')
const RunPowerShell = require('./runpowershell')

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
  return await GetNetIPAddress()
  .then(async res => {
    const macs = await GetMacAddress()
    res.macs = Array.isArray(macs) ? macs.map(v => ({mac: v.MACAddress, vendor: v.name})) : [{mac: macs.MACAddress, vendor: macs.name}]
    const ids = await DB.addNodes([res])
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
    .then(() => Promise.all([
      run_command(GetNetTcpConnection, 'Get-NetTcpConnection', res => DB.addConnections(local, res)),
      run_command(GetNetIPAddress, 'Get-NetIPAddress', res => DB.updateNode(local, res)),
      run_command(GetDnsClientCache, 'Get-DnsClientCache', res => DB.updateNode(local, res)),
      ...remote.map(v => [
        run_command(GetNetTcpConnection, 'Get-NetTcpConnection', res => DB.addConnections(v.id, res), v.hostname),
        run_command(GetNetIPAddress, 'Get-NetIPAddress', res => DB.updateNode(v.id, res), v.hostname),
        run_command(GetDnsClientCache, 'Get-DnsClientCache', res => DB.updateNode(v.id, res), v.hostname)
      ]).flat()
    ]))
    .then(() => loop ())
  }

  loop()
}

module.exports = run