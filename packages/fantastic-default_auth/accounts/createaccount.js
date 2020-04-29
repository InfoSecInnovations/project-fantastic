const BCrypt = require('bcrypt')
const GenerateID = require('../auth/generateid')
const {insert} = require('fantastic-utils/db')(require('../path'))
const GetConfig = require('../getconfig')

const createAccount = (username, password, role) => GetConfig()
  .then(config => BCrypt.hash(password, config.salt_rounds))
  .then(hash => GenerateID()
    .then(id => 
      insert('users', {username, password: hash, session_id: id, role})
      .then(() => id)
    )
  )

module.exports = createAccount