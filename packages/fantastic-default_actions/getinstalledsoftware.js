const InvokeCommandJSON = require('fantastic-cli/invokecommandjson')

const getInstalledSoftware = {
  name: 'Get Installed Software',
  description: 'Placeholder "dirty" way to get installed software pending a more elegant script',
  hosts: ['local', 'remote'],
  run: hostname => InvokeCommandJSON('Get-WmiObject -Class Win32_Product', hostname)
    .then(res => res.map(v => ([
      {
        id: `${v.IdentifyingNumber}header`,
        value: [
          {type: 'header', text: v.Name}
        ]
      },
      {
        id: v.IdentifyingNumber,
        value: [
          `Version ${v.Version}`,
          `Vendor: ${v.Vendor}`
        ]
      }
    ])).flat())
}

module.exports = getInstalledSoftware