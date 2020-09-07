const {transaction} = require('../db')

const updateHistory = async (quest, user_id, date, results, rows) => {
  const db = await transaction()
  const event_id = await db.insert('quest_history', {quest, date, user_id, rows: JSON.stringify(rows)})
  await db.insert('all_history', {event_type: 'quest', event_id, date, user_id})
  await db.close()
}

module.exports = updateHistory