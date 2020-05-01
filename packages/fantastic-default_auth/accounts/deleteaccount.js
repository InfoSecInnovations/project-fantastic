const {remove} = require('../db')

// TODO: don't allow deleting the last admin
const deleteAccount = username => remove({table: 'users', conditions: {username}})

module.exports = deleteAccount