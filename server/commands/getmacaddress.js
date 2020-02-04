const RunPowerShell = require('./runpowershell')

const getMacAddress = () => RunPowerShell('get-ciminstance -ClassName Win32_NetworkAdapter | where {($_.AdapterTypeId -eq 0) -And ($_.PNPDeviceID -Like "*PCI*")} | select MACAddress, name | ConvertTo-Json')
  .then(res => JSON.parse(res))

module.exports = getMacAddress