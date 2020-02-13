const InvokeCommand = require('fantastic-cli/invokecommand')

const getHostname = hostname => InvokeCommand('hostname', hostname)

module.exports = getHostname