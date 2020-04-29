const {run, get, update} = require('fantastic-utils/db')(require('./path'))
const Schema = require('./schema')
const FS = require('fs').promises
const Path = require('path')
const Auth = require('./auth')
const CreateAccount = require('./accounts/createaccount')
const Admin = require('./accounts/admin')
const Serve = require('./serve')
const GetConfig = require('./getconfig')

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
}

const verify = session_id => get({table: 'users', columns: ['user_id', 'role'], conditions: {columns: {session_id}}})

const invalidate = session_id => update({table: 'users', row: {session_id: null}, conditions: {columns: {session_id}}})

module.exports = {configure, verify, invalidate}