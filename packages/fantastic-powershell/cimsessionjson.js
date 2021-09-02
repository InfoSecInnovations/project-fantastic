const ProcessJSON = require('./processjson')
const CimSession = require('./cimsession')

/**
 * Execute a PowerShell cmdlet which can use a CimSession (see Microsoft documentation to check if the cmdlet has a CimSession parameter or not).
 * @param {string} command 
 * @param {string} hostname 
 * @param {Object} params 
 * @returns {Promise<Object>} The output from the PowerShell command converted to JSON.
 */
const cimSessionJson = (command, hostname, params) => CimSession(`${command} | ConvertTo-Json`, hostname, params).then(ProcessJSON)

module.exports = cimSessionJson