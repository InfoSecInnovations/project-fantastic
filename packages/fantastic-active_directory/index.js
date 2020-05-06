const Serve = require('./http/serve')

const configure = app => {
  app.get('/auth', (res, req) => Serve('auth.html', res))
  app.get('/auth/public/*', (res, req) => {
    const url = req.getUrl()
    const split = url.split('/')
    const path = split[split.length - 1]
    Serve(`public/${path}`, res)
  })
}

module.exports = {configure, invalidate: require('./accounts/invalidate'), verify: require('./accounts/verify')}