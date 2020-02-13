const InvokeCommand = require('fantastic-cli/invokecommand')

const getOS = {
  hosts: ['local', 'remote'],
  result_type: 'os',
  run: hostname => InvokeCommand(`(Get-CimInstance -ClassName Win32_OperatingSystem).Caption`, hostname)
}

module.exports = getOS