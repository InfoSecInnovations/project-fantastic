const Serve = require('./http/serve')
const {init} = require('./db')

init()

const configure = app => {
  app.get('/auth', require('./http/auth'))
  app.get('/auth/myaccount', require('./http/myaccount'))
  app.get('/auth/public/*', (res, req) => {
    const url = req.getUrl()
    const split = url.split('/')
    const path = split[split.length - 1]
    Serve(`public/${path}`, res)
  })
}

module.exports = {configure, invalidate: require('./accounts/invalidate'), verify: require('./accounts/verify'), get: require('./accounts/getbyid')}