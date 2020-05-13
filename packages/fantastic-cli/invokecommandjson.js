const InvokeCommand = require('./invokecommand')
const ProcessJSON = require('./processjson')

const invokeCommandJson = (command, hostname, params, log) => InvokeCommand(`${command} | ConvertTo-Json`, hostname, params, log).then(ProcessJSON)

module.exports = invokeCommandJson