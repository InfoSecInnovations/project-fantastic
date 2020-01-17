const Nmap = require('./nmap')
const GetNetTcpConnection = require('./getnettcpconnection')
const GetNetIPAddress = require('./getnetipaddress')
const GetStateMappings = require('./getstatemappings')
const DB = require('../db')

const run_command = (command, label, callback, loop = true) => {
  console.log(`getting results from ${label}...`)
  command()
  .then(res => callback(res))
  .then(() => console.log(`${label} results ready`))
  .then(() => {if (loop) run_command(command, label, callback)})
}

const run = () => {
  run_command(Nmap, 'nmap', DB.addNodes)
  run_command(GetNetTcpConnection, 'Get-NetTcpConnection', DB.addConnections)
  run_command(GetNetIPAddress, 'Get-NetIPAddress', DB.addNodes, false)
  run_command(GetStateMappings, 'Get-NetTCPConnection State Mapping', () => {})
}

module.exports = run