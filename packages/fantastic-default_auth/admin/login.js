const Login = require('../accounts/login')
const Serve = require('../http/serve')
const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const GenerateID = require('@infosecinnovations/fantastic-utils/generateid')
const {get, update} = require('../db')
const GetHTTPData = require('@infosecinnovations/fantastic-utils/gethttpdata')
const Error = require('../http/error')

const success = id => new Promise((resolve, reject) => {
  get({table: 'users', columns: ['user_id', 'role'], conditions: {columns: {session_id: id}}})
  .then(row => {
    if (!row || row.role !== 'admin') return reject()
    row.session_id = id
    resolve(row)
  })
})

const login = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData(res)
  .then(data => {
    const json = ParseQuery(data)
    Login(json)
    .then(id => success(id))
    .then(async row => {
      const admin_id = await GenerateID()
      await update({table: 'users', row: {admin_session_id: admin_id}, conditions: {columns: {user_id: row.user_id}}})
      res.writeHeader('Set-Cookie', `admin_id=${admin_id}; Secure; HttpOnly; Path=/auth/admin;`)
      res.writeHeader('Set-Cookie', 'error=;')
      Serve('admin.html', res)
    })
    .catch(() => Error(res, "invalid login or user doesn't have admin role", '/auth/admin'))
  })
}

module.exports = login