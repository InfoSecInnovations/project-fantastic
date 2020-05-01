const BCrypt = require('bcrypt')
const GenerateID = require('../utils/generateid')
const {get, update} = require('../db')

const login = json => get({table: 'users', conditions: {columns: {username: json.username}}})
  .then(async row => {
    if (!row) throw undefined // TODO: protect against timing attacks from no result vs result+compare hash?
    compare = await BCrypt.compare(json.password, row.password)
    if (compare) {
      const id = await GenerateID()
      await update({table: 'users', row: {session_id: id}, conditions: {columns: {user_id: row.user_id}}})
      return id
    }
    throw undefined
  })

module.exports = login