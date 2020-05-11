const ProcessJSON = require('./processjson')
const CimSession = require('./cimsession')

const cimSessionJson = (command, hostname, log) => CimSession(`${command} | ConvertTo-Json`, hostname, log).then(ProcessJSON)

module.exports = cimSessionJson