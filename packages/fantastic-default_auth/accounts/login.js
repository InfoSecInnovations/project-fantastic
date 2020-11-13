const BCrypt = require('bcrypt')
const GenerateID = require('@infosecinnovations/fantastic-utils/generateid')
const {get, update} = require('../db')

const login = json => get({table: 'users', conditions: {columns: {username: json.username}}})
  .then(async row => {
    if (!row) throw undefined
    compare = await BCrypt.compare(json.password, row.password)
    if (!compare) throw undefined
    const id = await GenerateID()
    await update({table: 'users', row: {session_id: id}, conditions: {columns: {user_id: row.user_id}}})
    return id
  })

module.exports = login