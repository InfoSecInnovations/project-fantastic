const CimSessionJSON = require('fantastic-cli/cimsessionjson')

const getDnsClientCache = {
  name: 'Get-DnsClientCache',
  description: 'Run Get-DnsClientCache cmdlet on the host and return records which correspond to internal IP Addresses.',
  hosts: ['local', 'remote'],
  result_type: 'ip_addresses',
  run: hostname => CimSessionJSON('Get-DnsClientCache -RecordType A', hostname, undefined, false)
    .then(res => res.map(v => v.Data).filter(v => v.startsWith('192.168') || v.startsWith('10.')))
}

module.exports = getDnsClientCache