const GetCookie = require('fantastic-utils/getcookie')
const {get} = require('../db')
const DeleteAccount = require('../accounts/deleteaccount')
const Error = require('./error')

const error = 'You must be logged in to do this!'

const deleteAccount = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const session_id = GetCookie(req.getHeader('cookie'), 'session_id')
  if (!session_id) return Error(res, error)
  get({table: 'users', columns: ['username', 'role'], conditions: {columns: {session_id}}})
  .then(async row => {
    if (!row) return Error(res, error)
    try {
      await DeleteAccount(row.username)
      res.writeStatus('302 Found')
      res.writeHeader('Location', '/auth')
      res.writeHeader('Set-Cookie', `error=;`)
      return res.end()
    }
    catch(err) {
      if (err.last_admin) return Error(res, 'Deleting this account would mean that there would no longer be any admin accounts!')
      return Error(res, error)
    }
  })
}

module.exports = deleteAccount