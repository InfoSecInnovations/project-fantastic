const {get, insert, update} = require('../../db')

const updateResult = async (action, func, node_id, user_id, date, result, index) => {
  const existing = await get({table: 'results', columns: ['result_id'], conditions: {columns: {action, function: func, node_id, result_index: index, user_id}}})
  if (existing) await update({table: 'results', row: {data: JSON.stringify(result), date}, conditions: {columns: {result_id: existing.result_id}}})
  else await insert('results', {data: JSON.stringify(result), date, action, function: func, node_id, result_index: index, user_id})
}

module.exports = updateResult