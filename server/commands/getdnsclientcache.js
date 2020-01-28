const RunPowerShell = require('./runpowershell')

const getDnsClientCache = () => RunPowerShell('Get-DnsClientCache -RecordType A |  ConvertTo-Json')
  .then(res => [JSON.parse(res).reduce((result, v) => {
    const ip = v.Data  
    if (!result.ips.includes(ip) && (ip.startsWith('192.168') || ip.startsWith('10.'))) result.ips.push(ip)
      return result
  }, {ips: ['127.0.0.1']})]) // TODO: this is a hack to group the results with localhost until we know which host we're running the command from

module.exports = getDnsClientCache