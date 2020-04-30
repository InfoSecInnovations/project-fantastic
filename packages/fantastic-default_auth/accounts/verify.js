const {get} = require('../db')

const verify = session_id => session_id ? get({table: 'users', columns: ['user_id', 'role'], conditions: {columns: {session_id}}}) : Promise.resolve()

module.exports = verify