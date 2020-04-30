const CheckAdmin = require('./checkadmin')
const {update, get} = require('../db')

const changeRole = (res, req) => {
  res.onAborted(() => res.aborted = true)
  CheckAdmin(res, req)
  .then(data => {
    const json = JSON.parse(data)
    update({table: 'users', row: {role: json.role, admin_session_id: null}, conditions: {columns: {username: json.username}}})
    .then(() => get({table: 'users', columns: ['username', 'role'], conditions: {columns: {username: json.username}}}))
    .then(row => {
      if (!row) return res.end(JSON.stringify({error: "user doesn't exist"}))
      res.end(JSON.stringify(row))
    })
  })
  .catch(() => {})
}

module.exports = changeRole