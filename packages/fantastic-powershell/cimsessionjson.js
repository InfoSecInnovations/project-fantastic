const ProcessJSON = require('./processjson')
const CimSession = require('./cimsession')

/**
 * Execute a PowerShell cmdlet which can use a CimSession (see Microsoft documentation to check if the cmdlet has a CimSession parameter or not).
 * @param {string} command 
 * @param {string} hostname 
 * @param {Object} params 
 * @param {boolean} log Enable error logging.
 * @returns {Promise<Object>} The output from the PowerShell command converted to JSON.
 */
const cimSessionJson = (command, hostname, params, log) => CimSession(`${command} | ConvertTo-Json`, hostname, params, log).then(ProcessJSON)

module.exports = cimSessionJson