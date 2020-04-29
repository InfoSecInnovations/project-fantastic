const {run, get} = require('fantastic-utils/db')(require('./path'))
const Schema = require('./schema')
const FS = require('fs').promises
const Path = require('path')
const Auth = require('./auth')
const CreateAccount = require('./accounts/createaccount')

run(Schema)
.then(() => FS.readFile(Path.join(__dirname, 'config.json')))
.then(res => {
  const config = JSON.parse(res)
  return get({table: 'users', columns: ['user_id'], conditions: {columns: {username: config.admin_account.username}}})
  .then(row => {
    if (!row) CreateAccount(config.admin_account.username, config.admin_account.password, 'admin')
  })
})
.catch(err => console.log(err.message))

const serve = (path, res) => {
  res.onAborted(() => res.aborted = true)
  FS.readFile(Path.join(__dirname, 'files', path))
  .then(file => res.end(file))
}

const configure = app => {
  app.get('/auth', (res, req) => serve('auth.html', res))
  app.post('/auth', Auth)
}

const verify = session_id => get({table: 'users', columns: ['user_id', 'role'], conditions: {columns: {session_id}}})

module.exports = {configure, verify}