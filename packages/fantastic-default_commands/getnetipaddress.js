const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const getNetIPAddress = {
  name: 'Get-NetIpAddress',
  description: 'Run the Get-NetIpAddress cmdlet to find all IP Addresses belonging to the host.',
  hosts: ['local', 'remote'],
  result_type: 'ip_addresses',
  run: hostname => CimSessionJSON('get-netipaddress', hostname)
    .then(res => res.map(v => v.IPAddress))
}

module.exports = getNetIPAddress