const {get, init} = require('./db')
const CreateAccount = require('./accounts/createaccount')
const Serve = require('./http/serve')

const setAdmin = ({username, password}) => init()
  .then(() =>
    get({table: 'users', columns: ['user_id'], conditions: {columns: {username: username, role: 'admin'}, combine: 'OR'}})
    .then(row => {
      if (!row) return CreateAccount(username, password, 'admin')
    })
  )

const configure = app => {
  setAdmin({username: 'admin', password: 'changeme'})
  app.get('/auth', require('./http/auth'))
  app.post('/auth/login', require('./http/login'))
  app.post('/auth/register', require('./http/register'))
  app.post('/auth/changepassword', require('./http/changepassword'))
  app.get('/auth/myaccount', require('./http/myaccount'))
  app.get('/auth/logout', require('./http/logout'))
  app.post('/auth/deleteaccount', require('./http/deleteaccount'))
  app.get('/auth/admin', (res, req) => Serve('adminlogin.html', res))
  app.post('/auth/admin', require('./admin/login'))
  app.post('/auth/admin/getuser', require('./admin/getaccount'))
  app.post('/auth/admin/changerole', require('./admin/changerole'))
  app.post('/auth/admin/deleteaccount', require('./admin/deleteaccount'))
  app.get('/auth/public/*', (res, req) => {
    const url = req.getUrl()
    const split = url.split('/')
    const path = split[split.length - 1]
    Serve(`public/${path}`, res)
  })
}

module.exports = {configure, verify: require('./accounts/verify'), invalidate: require('./accounts/invalidate'), getByID: require('./accounts/getbyid'), getByUsername: require('./accounts/getbyusername'), setAdmin}