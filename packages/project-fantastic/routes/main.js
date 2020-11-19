const Serve = require('./serve')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')

const main = (user, res, req) => {
  if (!user) {
    res.writeStatus('302')
    res.writeHeader('Location', '/auth')
    res.end()
    return
  }
  if (!HasRole(user, 'user')) return res.end('Not authorized to view this content.')
  Serve(res, '/index.html')
}

module.exports = main