const RunPowerShell = require('./runpowershell')

/**
 * Execute a PowerShell command using PowerShell's "Invoke-Command -ScriptBlock".
 * @param {string} command 
 * @param {string} hostname 
 * @param {Object} params 
 * @param {boolean} log Enable error logging.
 * @returns {Promise<string>} The raw output from the PowerShell command.
 */
const invokeCommand = (command, hostname, params, log) => RunPowerShell(`${hostname ? `Invoke-Command -ComputerName ${hostname} -ScriptBlock { ` : ''}${command} ${hostname ? '}' : ''}`, params, log)

module.exports = invokeCommand