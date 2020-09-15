const GetCookie = require('fantastic-utils/getcookie')
const {get} = require('../db')

const error = JSON.stringify({error: 'You must be logged in to do this!'})

const myAccount = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const session_id = GetCookie(req.getHeader('cookie'), 'session_id')
  if (!session_id) res.end(error)
  get({table: 'users', columns: ['username', 'role'], conditions: {columns: {session_id}}})
  .then(row => {
    if (res.aborted) return
    if (!row) res.end(error)
    res.end(JSON.stringify(row))
  })
}

module.exports = myAccount