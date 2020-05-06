const Auth = require('./auth')

const getUser = (res, req) => {
  res.onAborted(() => res.aborted = true)
  Auth(req.getHeader('cookie'))
  .then(user => {
    if (res.aborted) return
    if (!user) return res.end()
    res.end(JSON.stringify({username: user.username, role: user.role}))
  })
}

module.exports = getUser