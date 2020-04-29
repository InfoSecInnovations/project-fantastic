const BCrypt = require('bcrypt')
const GenerateID = require('./generateid')
const {get, update} = require('fantastic-utils/db')(require('../path'))

const login = (res, json) => new Promise((resolve, reject) => {
  get({table: 'users', conditions: {columns: {username: json.username}}})
  .then(row => {
    if (!row) return reject() // TODO: protect against timing attacks from no result vs result+compare hash?
    BCrypt.compare(json.password, row.password)
    .then(compare => {
      if (compare) {
        return GenerateID()
        .then(id => 
          update({table: 'users', row: {session_id: id}, conditions: {columns: {user_id: row.user_id}}})
          .then(() => {
            res.writeHeader('Set-Cookie', `session_id=${id};`)
            resolve(id)
          })
        )
      }
      return reject()
    })
  })
})

module.exports = login