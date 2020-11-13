const RunCommand = require('./runcommand')
const FlatUnique = require('@infosecinnovations/fantastic-utils/flatunique')

/**
 * Run all commands of a particular type on a host
 * @param {Object.<string, import('../types').Command>} commands 
 * @param {import('../types').CommandType} result_type 
 * @param {import('../types').HostType} host 
 * @param {string} hostname 
 */
const runType = (commands, result_type, host, hostname) => commands[result_type] ?
  Promise.all(commands[result_type].filter(v => v.hosts.includes(host)).map(v => RunCommand(v, hostname))).then(FlatUnique) :
  Promise.resolve([])

module.exports = runType