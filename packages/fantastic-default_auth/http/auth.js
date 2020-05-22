const GetCookie = require('fantastic-utils/getcookie')
const Serve = require('./serve')
const Verify = require('../accounts/verify')

const auth = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const header = req.getHeader('cookie')
  const session_id = GetCookie(header, 'session_id')
  Verify(session_id)
  .then(user => {
    if (!user) return Serve('auth.html', res)
    return Serve('account.html', res)
  })
}

module.exports = auth