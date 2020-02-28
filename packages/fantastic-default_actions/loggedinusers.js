const InvokeCommandJSON = require('fantastic-cli/invokecommandjson')

const loggedInUsers = {
  name: 'Get Logged In Users',
  description: 'This is a quick and dirty way to pull the current logged in users',
  hosts: ['local', 'remote'],
  run: hostname => InvokeCommandJSON('(Get-WmiObject Win32_LoggedOnUser).Antecedent', hostname)
    .then(res => res.map(v => {
      // extract name from \\.\root\cimv2:Win32_Account.Domain="DESKTOP-PBNIV5R",Name="sebovzeoueb"
      const index = v.lastIndexOf('Name')
      const end = v.substring(index)
      const split = end.split('"')
      const name = split[1]
      return {
        id: name,
        value: [{type: 'header', text: name}]
      }
    }))
}

module.exports = loggedInUsers