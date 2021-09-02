const InvokeCommand = require('./invokecommand')
const ProcessJSON = require('./processjson')

/**
 * Execute a PowerShell command using PowerShell's "Invoke-Command -ScriptBlock".
 * @param {string} command 
 * @param {string} hostname 
 * @param {Object} params 
 * @returns {Promise<Object>} The output from the PowerShell command converted to JSON.
 */
const invokeCommandJson = (command, hostname, params) => InvokeCommand(`${command} | ConvertTo-Json`, hostname, params).then(ProcessJSON)

module.exports = invokeCommandJson