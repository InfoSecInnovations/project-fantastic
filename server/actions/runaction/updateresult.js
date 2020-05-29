const {insert} = require('../../db')

const updateResult = (action, func, node_id, user_id, date, result, label) => insert('action_history', {data: JSON.stringify(result), date, action, function: func, node_id, label, user_id})
  .then(res => insert('all_history', {event_type: 'action', event_id: res, date, user_id}))

module.exports = updateResult