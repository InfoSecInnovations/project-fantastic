const RunPowerShell = require('./runpowershell')
const ProcessJSON = require('./processjson')

const cimSessionJson = (command, hostname) => RunPowerShell(`${command} ${hostname ? `-CimSession ${hostname}` : ''} | ConvertTo-Json`).then(ProcessJSON)

module.exports = cimSessionJson