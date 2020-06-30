const {transaction} = require('../db')

const updateHistory = async (test, user_id, date, results, parameters) => {
  const db = await transaction()
  const event_id = await db.insert('test_history', {test, date, results: JSON.stringify(results), parameters: JSON.stringify(parameters), user_id})
  await db.insert('all_history', {event_type: 'test', event_id, date, user_id})
  await db.close()
}

module.exports = updateHistory