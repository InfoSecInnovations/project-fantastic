const Auth = require('./auth')
const Files = require('./files')
const HasRole = require('./auth/hasrole')

const main = (res, req) => {
  const path = req.getUrl()
  res.onAborted(() => res.aborted = true)
  Auth(res, req)
  .then(user => {
    // TODO: load auth_module
    if (!user) {
      res.writeStatus('302')
      res.writeHeader('Location', '/auth')
      res.end()
      return
    }
    if (!HasRole(user, 'user')) return res.end('Not authorized to view this content.')
    Files(res, path)
  })
}

module.exports = main