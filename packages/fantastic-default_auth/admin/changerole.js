const CheckAdmin = require('./checkadmin')
const {update, get} = require('../db')

const changeRole = (res, req) => {
  res.onAborted(() => res.aborted = true)
  CheckAdmin(res, req)
  .then(async data => {
    const json = JSON.parse(data)
    await update({table: 'users', row: {role: json.role, admin_session_id: null}, conditions: {columns: {username: json.username}}})
    const row = await get({table: 'users', columns: ['username', 'role'], conditions: {columns: {username: json.username}}})
    if (!row) return res.end(JSON.stringify({error: "user doesn't exist"}))
    res.end(JSON.stringify(row))
  })
  .catch(() => {})
}

module.exports = changeRole