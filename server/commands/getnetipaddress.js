const RunPowerShell = require('./runpowershell')
const DefaultIPs = require('../../util/defaultips')

const getNetIPAddress = () => RunPowerShell('get-netipaddress | ConvertTo-Json')
.then(res => JSON.parse(res).reduce((result, v) => {
  if (!result.ips.includes(v.IPAddress)) result.ips.push(v.IPAddress)
  return result
}, {ips: [...DefaultIPs], important: true}))

module.exports = getNetIPAddress