const {get} = require('../db')

const getByID = id => get({table: 'users', conditions: {columns: {user_id: id}}})

module.exports = getByID