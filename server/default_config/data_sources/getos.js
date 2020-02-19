const InvokeCommand = require('fantastic-cli/invokecommand')

const getOS = {
  name: 'Get Windows Operating System',
  description: 'Execute this on a Windows host to get the Operating System version.',
  hosts: ['local', 'remote'],
  result_type: 'os',
  run: hostname => InvokeCommand(`(Get-CimInstance -ClassName Win32_OperatingSystem).Caption`, hostname)
}

module.exports = getOS