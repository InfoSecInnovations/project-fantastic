const InvokeCommand = require('./invokecommand')
const ProcessJSON = require('./processjson')

/**
 * Execute a PowerShell command using PowerShell's "Invoke-Command -ScriptBlock".
 * @param {string} command 
 * @param {string} hostname 
 * @param {Object} params 
 * @param {boolean} log Enable error logging.
 * @returns {Promise<Object>} The output from the PowerShell command converted to JSON.
 */
const invokeCommandJson = (command, hostname, params, log) => InvokeCommand(`${command} | ConvertTo-Json`, hostname, params, log).then(ProcessJSON)

module.exports = invokeCommandJson