const PwshFunction = require('../../../util/pwshfunction')
const GetFilter = require('./getfilter')
const Result = require('./result')
const ProcessResults = require('./processresults')

/**
 * Run a function from an action on the specified host
 * @param {{}} action 
 * @param {string} func 
 * @param {{}} user 
 * @param {string} hostname 
 * @param {{}} [data]
 * @returns {{
 *  results: import('./types').Result[],
 *  filter?: boolean
 * }}
 */
const runFunction = async (action, func, user, hostname, data) => {
  const func_data = action.functions[func]
  const output = await PwshFunction(func_data)(func_data.command, hostname, data)
  if (!func_data.result) return {results: []}
  const filter = await GetFilter(func_data.result.filter)
  if (func_data.json) return {results: ProcessResults(output.map(o => Result(func_data.result, o, action, user, filter))), filter: filter ? true : false}
  return {results: ProcessResults([Result(func_data.result, output, action, user)])} // TODO: better handling of non JSON output
}

module.exports = runFunction