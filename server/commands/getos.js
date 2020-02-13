const InvokeCommand = require('fantastic-cli/invokecommand')

const getOS = hostname => InvokeCommand(`(Get-CimInstance -ClassName Win32_OperatingSystem).Caption`, hostname)

module.exports = getOS