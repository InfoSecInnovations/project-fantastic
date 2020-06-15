const InvokeCommandJSON = require('fantastic-cli/invokecommandjson')

const getMacAddress = {
  name: 'Get MAC Addresses',
  description: 'Find Network Adapters with PCI and USB device IDs and return their MAC Addresses.',
  hosts: ['local', 'remote'],
  result_type: 'mac_addresses',
  run: hostname => InvokeCommandJSON('get-ciminstance -ClassName Win32_NetworkAdapter | where {($_.AdapterTypeId -eq 0) -And ($_.PNPDeviceID -Like "*PCI*" -Or $_.PNPDeviceID -Like "*USB*")} | select MACAddress, name', hostname)
    .then(res => res.map(v => ({mac: v.MACAddress, vendor: v.name})))
}

module.exports = getMacAddress