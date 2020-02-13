const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const getDnsClientCache = {
  hosts: ['local', 'remote'],
  result_type: 'ips',
  run: hostname => CimSessionJSON('Get-DnsClientCache -RecordType A', hostname)
    .then(res => res.map(v => v.Data).filter(v => v.startsWith('192.168') || v.startsWith('10.')))
}

module.exports = getDnsClientCache