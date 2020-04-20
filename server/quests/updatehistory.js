const {get, insert, update} = require('../db/operations')

const updateHistory = async (quest, date, results) => {
  const existing = await get({table: 'quest_history', columns: ['quest_id'], conditions: {columns: {quest}}})
  if (existing) await update({table: 'quest_history', row: {results: JSON.stringify(results), date}, conditions: {columns: {quest_id: existing.quest_id}}})
  else await insert('quest_history', {quest, date, results: JSON.stringify(results)})
}

module.exports = updateHistory