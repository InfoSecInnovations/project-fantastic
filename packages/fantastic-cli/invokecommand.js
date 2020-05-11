const RunPowerShell = require('./runpowershell')

const invokeCommand = (command, hostname, log) => RunPowerShell(`${hostname ? `Invoke-Command -ComputerName ${hostname} -ScriptBlock { ` : ''}${command} ${hostname ? '}' : ''}`, log)

module.exports = invokeCommand