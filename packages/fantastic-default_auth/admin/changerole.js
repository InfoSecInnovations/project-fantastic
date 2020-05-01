const CheckAdmin = require('./checkadmin')
const {update, get, all} = require('../db')

const changeRole = (res, req) => {
  res.onAborted(() => res.aborted = true)
  CheckAdmin(res, req)
  .then(async result => {
    const json = JSON.parse(result.data)
    const current = await get({table: 'users', columns: ['username', 'role'], conditions: {columns: {username: json.username}}})
    if (!current) return res.end(JSON.stringify({error: "user doesn't exist"}))
    if (json.role === current.role) return res.end(JSON.stringify(current))
    if (current.role === 'admin') {
      const rows = await all({table: 'users', columns: ['user_id'], conditions: {columns: {role: 'admin'}}})
      if (rows.length <= 1) return res.end(JSON.stringify({error: "changing this user's role would mean that there would no longer be any admin accounts!"}))
    }
    await update({table: 'users', row: {role: json.role, admin_session_id: null}, conditions: {columns: {username: json.username}}})
    const row = await get({table: 'users', columns: ['username', 'role'], conditions: {columns: {username: json.username}}})
    res.end(JSON.stringify(row))
  })
  .catch(() => {})
}

module.exports = changeRole