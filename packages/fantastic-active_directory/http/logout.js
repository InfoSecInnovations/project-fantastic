const Invalidate = require('../accounts/invalidate')
const GetCookie = require('@infosecinnovations/fantastic-utils/getcookie')

const logOut = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const session_id = GetCookie(req.getHeader('cookie'), 'session_id')
  Invalidate(session_id)
  .then(() => {
    res.writeStatus('302 Found')
    res.writeHeader('Location', '/auth')
    res.end()
  })
}

module.exports = logOut