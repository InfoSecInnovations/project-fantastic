const RunPowerShell = require('./runpowershell')

/**
 * Execute a PowerShell cmdlet which can use a CimSession (see Microsoft documentation to check if the cmdlet has a CimSession parameter or not).
 * @param {string} command 
 * @param {string} hostname 
 * @param {Object} params 
 * @returns {Promise<string>} The raw output from the PowerShell command.
 */
const cimSession = (command, hostname, params) => 
{
  const index = !hostname ? -1 : command.indexOf('|')
  const session = hostname ? `-CimSession ${hostname} ` : ''
  return RunPowerShell((index <= 0) ? `${command} ${session}` : `${command.substring(0, index - 1)} ${session} ${command.substring(index - 1)}`, params)
}

module.exports = cimSession