const {get} = require('../db')

const getByID = id => get({table: 'users', columns: ['username', 'role', 'user_id'], conditions: {columns: {user_id: id}}})

module.exports = getByID