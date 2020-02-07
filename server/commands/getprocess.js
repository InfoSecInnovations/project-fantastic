const RunPowerShell = require('./runpowershell')

const get_process = (id, hostname) => RunPowerShell(`${hostname ? `Invoke-Command -ComputerName ${hostname} -ScriptBlock { ` : ''}(get-process -id ${id}).name ${hostname ? '}' : ''}`, false)

module.exports = get_process