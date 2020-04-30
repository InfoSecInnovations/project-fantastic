const BCrypt = require('bcrypt')
const {update} = require('../db')
const GetConfig = require('../utils/getconfig')

const setPassword = (username, password) => GetConfig()
  .then(res => BCrypt.hash(password, res.salt_rounds))
  .then(res => update({table: 'users', row: {password: res}, conditions: {columns: {username}}}))

module.exports = setPassword