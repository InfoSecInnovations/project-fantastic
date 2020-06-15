const InvokeCommand = require('fantastic-cli/invokecommand')

const getHostname = {
  name: 'Get Hostname',
  description: 'Simply executes hostname command on host',
  hosts: ['local', 'remote'],
  result_type: 'hostname',
  run: hostname => InvokeCommand('hostname', hostname)
}

module.exports = getHostname