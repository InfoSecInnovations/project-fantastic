const {transaction} = require('../../db')

const updateResult = async (action, func, node_id, user_id, date, result, label) => {
  const db = await transaction()
  const event_id = await db.insert('action_history', {data: JSON.stringify(result), date, action, function: func, node_id, label, user_id})
  await db.insert('all_history', {event_type: 'action', event_id, date, user_id})
  await db.close()
}

module.exports = updateResult