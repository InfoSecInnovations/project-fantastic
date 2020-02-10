const InvokeCommand = require('./invokecommand')

const getMacAddress = hostname => InvokeCommand('get-ciminstance -ClassName Win32_NetworkAdapter | where {($_.AdapterTypeId -eq 0) -And ($_.PNPDeviceID -Like "*PCI*" -Or $_.PNPDeviceID -Like "*USB*")} | select MACAddress, name | ConvertTo-Json', hostname)
  .then(res => JSON.parse(res))
  .then(res => Array.isArray(res) ? res.map(v => ({mac: v.MACAddress, vendor: v.name})) : [{mac: res.MACAddress, vendor: res.name}])

module.exports = getMacAddress