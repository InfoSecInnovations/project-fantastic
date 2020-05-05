const {remove} = require('../db')
const LastAdmin = require('./lastadmin')

const deleteAccount = username => LastAdmin(username)
  .then(res => remove({table: 'users', conditions: {columns: {username}}}))

module.exports = deleteAccount