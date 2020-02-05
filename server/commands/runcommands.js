const Nmap = require('./nmap')
const GetNetTcpConnection = require('./getnettcpconnection')
const GetNetIPAddress = require('./getnetipaddress')
const GetDnsClientCache = require('./getdnsclientcache')
const GetMacAddress = require('./getmacaddress')
const DB = require('../db')

const run_command = async (command, label, callback) => {
  console.log(`getting results from ${label}...`)
  return await command()
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
  const loop = () => 
    run_command(Nmap, 'nmap', res => DB.updateNode(local, res.local).then(() => DB.addNodes(res.nodes)))  
    .then (() => Promise.all([
        // TODO: run below commands on remote hosts where we have the authority to do so
        run_command(GetNetTcpConnection, 'Get-NetTcpConnection', res => DB.addConnections(local, res)),
        run_command(GetNetIPAddress, 'Get-NetIPAddress', res => DB.updateNode(local, res)),
        run_command(GetDnsClientCache, 'Get-DnsClientCache', res => DB.updateNode(local, res))
      ]))
    .then(() => loop ())

  loop()
}

module.exports = run