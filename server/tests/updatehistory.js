const {get, insert, update} = require('../db')

const updateHistory = async (test, user_id, date, results, parameters) => {
  const existing = await get({table: 'test_history', columns: ['test_id'], conditions: {columns: {test, user_id}}})
  if (existing) await update({table: 'test_history', row: {results: JSON.stringify(results), parameters: JSON.stringify(parameters), date}, conditions: {columns: {test_id: existing.test_id}}})
  else await insert('test_history', {test, date, results: JSON.stringify(results), parameters: JSON.stringify(parameters), user_id})
}

module.exports = updateHistory