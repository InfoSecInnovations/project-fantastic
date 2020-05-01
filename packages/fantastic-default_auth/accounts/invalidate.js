const {update} = require('../db')

const invalidate = session_id => session_id ? update({table: 'users', row: {session_id: null, admin_session_id: null}, conditions: {columns: {session_id}}}) : Promise.resolve()

module.exports = invalidate