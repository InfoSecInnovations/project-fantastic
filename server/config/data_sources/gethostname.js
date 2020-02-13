const InvokeCommand = require('fantastic-cli/invokecommand')

const getHostname = {
  hosts: ['local', 'remote'],
  result_type: 'hostname',
  run: hostname => InvokeCommand('hostname', hostname)
}

module.exports = getHostname