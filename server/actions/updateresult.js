const {get, insert, update} = require('../db/operations')

const updateResult = async (action, func, node_id, result) => {
  const date = Date.now()
  const existing = await get({table: 'results', columns: ['result_id'], conditions: {columns: {action, function: func, node_id}}})
  if (existing) await update({table: 'results', row: {data: JSON.stringify(result), date}})
  else await insert('results', {data: JSON.stringify(result), date, action, function: func, node_id})
}

module.exports = updateResult