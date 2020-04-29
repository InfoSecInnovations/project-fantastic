const Success = require('./success')
const BCrypt = require('bcrypt')
const GenerateID = require('./generateid')
const {get, update} = require('fantastic-utils/db')(require('../path'))

const invalid_login = 'username or password was invalid! TODO: redirect to auth page with this message'

const login = (res, json) => {
  get({table: 'users', conditions: {columns: {username: json.username}}})
  .then(row => {
    if (!row) return res.end(invalid_login) // TODO: protect against timing attacks from no result vs result+compare hash?
    BCrypt.compare(json.password, row.password)
    .then(compare => {
      if (compare) {
        return GenerateID()
        .then(id => 
          update({table: 'users', row: {session_id: id}, conditions: {columns: {user_id: row.user_id}}})
          .then(() => Success(res, id))
        )
      }
      return res.end(invalid_login)
    })
  })
}

module.exports = login