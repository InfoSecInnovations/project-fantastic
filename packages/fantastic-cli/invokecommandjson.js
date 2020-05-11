const InvokeCommand = require('./invokecommand')
const ProcessJSON = require('./processjson')

const invokeCommandJson = (command, hostname, log) => InvokeCommand(`${command} | ConvertTo-Json`, hostname, log).then(ProcessJSON)

module.exports = invokeCommandJson