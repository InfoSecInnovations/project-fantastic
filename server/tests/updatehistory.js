const {get, insert, update} = require('../db/operations')

const updateHistory = async (test, date, results, parameters) => {
  const existing = await get({table: 'test_history', columns: ['test_id'], conditions: {columns: {test}}})
  if (existing) await update({table: 'test_history', row: {results: JSON.stringify(results), parameters: JSON.stringify(parameters), date}, conditions: {columns: {test_id: existing.test_id}}})
  else await insert('test_history', {test, date, results: JSON.stringify(results), parameters: JSON.stringify(parameters)})
}

module.exports = updateHistory