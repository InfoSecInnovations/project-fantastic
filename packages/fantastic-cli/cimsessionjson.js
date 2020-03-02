const ProcessJSON = require('./processjson')
const CimSession = require('./cimsession')

const cimSessionJson = (command, hostname) => CimSession(`${command} | ConvertTo-Json`, hostname).then(ProcessJSON)

module.exports = cimSessionJson