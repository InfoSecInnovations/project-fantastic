const GetPackagedData = require('../../util/getpackageddata')

/**
 * Select enabled commands and load their data grouped by command type
 * @param {Object.<string, 'disabled' | 'enabled' | 'force'} commands
 * @returns {Promise<Object.<string, import('./index').Command[]>>}
 */
const createCommands = commands => 
  commands ? Promise.all(Object.entries(commands)
  .filter(v => v[1] != 'disabled')
  .map(v => GetPackagedData(v[0], 'commands'))) // TODO: filter out invalid scripts and warn the user
  .then(res => res.reduce((result, v) => {
    (result[v.result_type] = result[v.result_type] || []).push(v)
    return result
  }, {})) :
  Promise.resolve()

module.exports = createCommands