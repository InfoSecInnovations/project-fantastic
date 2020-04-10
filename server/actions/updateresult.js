const {get, insert, update} = require('../db/operations')

const updateResult = async (action, func, node_id, date, result, key) => {
  const existing = await get({table: 'results', columns: ['result_id'], conditions: {columns: {action, function: func, node_id, key}}})
  if (existing) await update({table: 'results', row: {data: JSON.stringify(result), date}, conditions: {columns: {result_id: existing.result_id}}})
  else await insert('results', {data: JSON.stringify(result), date, action, function: func, node_id, key})
}

module.exports = updateResult