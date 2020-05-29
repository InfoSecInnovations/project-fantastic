const {insert} = require('../db')

const updateHistory = (quest, user_id, date, results) => insert('quest_history', {quest, date, results: JSON.stringify(results), user_id})
  .then(res => insert('all_history', {event_type: 'quest', event_id: res, date, user_id}))

module.exports = updateHistory