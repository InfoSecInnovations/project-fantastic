const RunPowerShell = require('./runpowershell')

const getDnsClientCache = hostname => RunPowerShell(`Get-DnsClientCache ${hostname ? `-CimSession ${hostname}` : ''} -RecordType A |  ConvertTo-Json`)
  .then(res => {
    const obj = JSON.parse(res)
    if (!obj) return
    if (Array.isArray(obj)) return obj.reduce((result, v) => {
      const ip = v.Data  
      if (!result.ips.includes(ip) && (ip.startsWith('192.168') || ip.startsWith('10.'))) result.ips.push(ip)
        return result
      }, {ips: []})
    return {ips: [obj]}
  })

module.exports = getDnsClientCache