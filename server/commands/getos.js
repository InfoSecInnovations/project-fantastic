const InvokeCommand = require('./invokecommand')

const getOS = hostname => InvokeCommand(`(Get-CimInstance -ClassName Win32_OperatingSystem).Caption`, hostname)

module.exports = getOS