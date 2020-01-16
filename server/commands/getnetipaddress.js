const RunPowerShell = require('./runpowershell')

const getNetIPAddress = () => RunPowerShell('get-netipaddress | ConvertTo-Json')
.then(res => [JSON.parse(res).reduce((result, v) => {
  result.ips.push(v.IPAddress)
  return result
}, {ips: []})])

module.exports = getNetIPAddress