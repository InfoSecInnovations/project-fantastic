const Auth = require('./auth')
const Serve = require('./serve')
const HasRole = require('./auth/hasrole')

const main = (res, req) => {
  res.onAborted(() => res.aborted = true)
  Auth(res, req)
  .then(user => {
    if (!user) {
      res.writeStatus('302')
      res.writeHeader('Location', '/auth')
      res.end()
      return
    }
    if (!HasRole(user, 'user')) return res.end('Not authorized to view this content.')
    Serve(res, '/index.html')
  })
}

module.exports = main