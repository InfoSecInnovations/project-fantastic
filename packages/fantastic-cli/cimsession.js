const RunPowerShell = require('./runpowershell')

const cimSession = (command, hostname) => RunPowerShell(`${command} ${hostname ? `-CimSession ${hostname}` : ''}`)

module.exports = cimSession