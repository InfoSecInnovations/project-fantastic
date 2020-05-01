const {update} = require('../db')

const invalidate = session_id => session_id && update({table: 'users', row: {session_id: null, admin_id: null}, conditions: {columns: {session_id}}})

module.exports = invalidate