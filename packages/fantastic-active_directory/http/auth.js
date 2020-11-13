const Serve = require('./serve')
const GetCookie = require('@infosecinnovations/fantastic-utils/getcookie')
const {get} = require('../db')

const auth = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const session_id = GetCookie(req.getHeader('cookie'), 'session_id')
  if (!session_id) return Serve('auth.html', res)
  get({table: 'users', columns: ['username'], conditions: {columns: {session_id}}})
  .then(row => {
    if (!row) return Serve('auth.html', res)
    return Serve('account.html', res)
  })

}

module.exports = auth