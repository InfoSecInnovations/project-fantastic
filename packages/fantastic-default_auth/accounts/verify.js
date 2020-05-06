const {get} = require('../db')

const verify = session_id => session_id ? get({table: 'users', columns: ['user_id', 'username'], conditions: {columns: {session_id}}}) : Promise.resolve() // TODO: check Active Directory group to get role

module.exports = verify