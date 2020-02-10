const RunPowerShell = require('./runpowershell')

const getDnsClientCache = hostname => RunPowerShell(`Get-DnsClientCache ${hostname ? `-CimSession ${hostname}` : ''} -RecordType A |  ConvertTo-Json`, false)
  .then(res => {
    if (!res) return
    const obj = JSON.parse(res)
    if (!obj) return
    const is_valid = ip => ip.startsWith('192.168') || ip.startsWith('10.')
    if (Array.isArray(obj)) return obj.reduce((result, v) => {
      const ip = v.Data  
      if (!result.ips.includes(ip) && is_valid(ip)) result.ips.push(ip)
        return result
      }, {ips: []})
    const ip = obj.Data
    if (is_valid(ip)) return {ips: [ip]}
  })

module.exports = getDnsClientCache