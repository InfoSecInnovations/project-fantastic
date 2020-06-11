const {get} = require('../db')

const getByUsername = username => get({table: 'users', columns: ['username', 'role', 'user_id'], conditions: {columns: {username}}})

module.exports = getByUsername