const InvokeCommand = require('./invokecommand')
const ProcessJSON = require('./processjson')

const invokeCommandJson = (command, hostname) => InvokeCommand(`${command} | ConvertTo-Json`, hostname).then(ProcessJSON)

module.exports = invokeCommandJson