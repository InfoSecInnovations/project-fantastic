const CheckAdmin = require('./checkadmin')
const LastAdmin = require('../accounts/lastadmin')
const {update, get, all} = require('../db')

const changeRole = (res, req) => {
  res.onAborted(() => res.aborted = true)
  CheckAdmin(res, req)
  .then(async result => {
    const json = JSON.parse(result.data)
    try {
      await LastAdmin(json.username)
    }
    catch(err) {
      if (err.not_exist) return res.end(JSON.stringify({error: "user doesn't exist"}))
      else return  res.end(JSON.stringify({error: "changing this user's role would mean that there would no longer be any admin accounts!"}))
    }
    await update({table: 'users', row: {role: json.role, admin_session_id: null}, conditions: {columns: {username: json.username}}})
    const row = await get({table: 'users', columns: ['username', 'role'], conditions: {columns: {username: json.username}}})
    res.end(JSON.stringify(row))
  }, rej => {})
}

module.exports = changeRole