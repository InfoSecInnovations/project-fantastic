const FS = require('fs').promises
const Path = require('path')
const BCrypt = require('bcrypt')
const GenerateID = require('../auth/generateid')
const {insert} = require('fantastic-utils/db')(require('../path'))

const createAccount = (username, password, role) => FS.readFile(Path.join(__dirname, '../config.json'))
  .then(file => {
    const config = JSON.parse(file)
    return BCrypt.hash(password, config.salt_rounds)
  })
  .then(hash => GenerateID()
    .then(id => 
      insert('users', {username, password: hash, session_id: id, role})
      .then(() => id)
    )
  )

module.exports = createAccount