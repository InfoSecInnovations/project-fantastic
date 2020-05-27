const {insert} = require('../../db')

const updateResult = (action, func, node_id, user_id, date, result, label) => insert('results', {data: JSON.stringify(result), date, action, function: func, node_id, label, user_id})

module.exports = updateResult