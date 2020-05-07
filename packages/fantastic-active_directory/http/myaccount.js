const GetCookie = require('fantastic-utils/getcookie')
const GetRole = require('../accounts/getrole')
const {get} = require('../db')

const error = JSON.stringify({error: 'You must be logged in to do this!'})

const myAccount = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const session_id = GetCookie(req.getHeader('cookie'), 'session_id')
  if (!session_id) res.end(error)
  get({table: 'users', columns: ['username'], conditions: {columns: {session_id}}})
  .then(async row => {
    if (!row) res.end(error)
    row.role = await GetRole(row.username)
    res.end(JSON.stringify(row))
  })
}

module.exports = myAccount