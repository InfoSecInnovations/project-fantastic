const InvokeCommand = require('./invokecommand')

const getHostname = hostname => InvokeCommand('hostname', hostname)

module.exports = getHostname