const ProcessJSON = require('./processjson')
const CimSession = require('./cimsession')

const cimSessionJson = (command, hostname, params, log) => CimSession(`${command} | ConvertTo-Json`, hostname, params, log).then(ProcessJSON)

module.exports = cimSessionJson