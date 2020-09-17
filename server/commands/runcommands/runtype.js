const RunCommand = require('./runcommand')
const FlatUnique = require('fantastic-utils/flatunique')

/**
 * Run all commands of a particular type on a host
 * @param {Object.<string, import('./index').Command>} commands 
 * @param {import('./index').CommandType} result_type 
 * @param {import('./index').HostType} host 
 * @param {string} hostname 
 */
const runType = (commands, result_type, host, hostname) => commands[result_type] ?
  Promise.all(commands[result_type].filter(v => v.hosts.includes(host)).map(v => RunCommand(v, hostname))).then(FlatUnique) :
  Promise.resolve([])

module.exports = runType