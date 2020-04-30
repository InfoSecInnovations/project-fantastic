const BCrypt = require('bcrypt')
const GenerateID = require('../utils/generateid')
const {insert} = require('../db')
const GetConfig = require('../utils/getconfig')

const createAccount = (username, password, role) => GetConfig()
  .then(res => BCrypt.hash(password, res.salt_rounds))
  .then(res => GenerateID()
    .then(id => 
      insert('users', {username, password: res, session_id: id, role})
      .then(() => id)
    )
  )

module.exports = createAccount