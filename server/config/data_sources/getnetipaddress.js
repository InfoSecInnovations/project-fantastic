const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const getNetIPAddress = {
  hosts: ['local', 'remote'],
  result_type: 'ip_addresses',
  run: hostname => CimSessionJSON('get-netipaddress', hostname)
    .then(res => res.map(v => v.IPAddress))
}

module.exports = getNetIPAddress