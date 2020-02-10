const RunPowerShell = require('./runpowershell')

const invokeCommand = (command, hostname) => RunPowerShell(`${hostname ? `Invoke-Command -ComputerName ${hostname} -ScriptBlock { ` : ''}${command} ${hostname ? '}' : ''}`, false)

module.exports = invokeCommand