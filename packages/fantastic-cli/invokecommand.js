const RunPowerShell = require('./runpowershell')

const invokeCommand = (command, hostname, params, log) => RunPowerShell(`${hostname ? `Invoke-Command -ComputerName ${hostname} -ScriptBlock { ` : ''}${command} ${hostname ? '}' : ''}`, params, log)

module.exports = invokeCommand