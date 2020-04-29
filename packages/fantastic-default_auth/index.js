const {run, get, update} = require('fantastic-utils/db')(require('./path'))
const Schema = require('./schema')
const Auth = require('./auth')
const CreateAccount = require('./accounts/createaccount')
const Admin = require('./accounts/admin')
const Serve = require('./serve')
const GetConfig = require('./getconfig')
const GetAccount = require('./accounts/getaccount')

run(Schema)
.then(() => GetConfig())
.then(config => get({table: 'users', columns: ['user_id'], conditions: {columns: {username: config.admin_account.username}}})
  .then(row => {
    if (!row) CreateAccount(config.admin_account.username, config.admin_account.password, 'admin')
  })
)
.catch(err => console.log(err.message))

const configure = app => {
  app.get('/auth', (res, req) => Serve('auth.html', res))
  app.post('/auth', Auth)
  app.get('/admin', (res, req) => Serve('adminlogin.html', res))
  app.post('/admin', Admin)
  app.post('/admin/getuser', GetAccount)
  app.get('/auth/public/*', (res, req) => {
    const url = req.getUrl()
    const split = url.split('/')
    const path = split[split.length - 1]
    Serve(`public/${path}`, res)
  })
}

const verify = session_id => get({table: 'users', columns: ['user_id', 'role'], conditions: {columns: {session_id}}})

const invalidate = session_id => update({table: 'users', row: {session_id: null, admin_id: null}, conditions: {columns: {session_id}}})

module.exports = {configure, verify, invalidate}