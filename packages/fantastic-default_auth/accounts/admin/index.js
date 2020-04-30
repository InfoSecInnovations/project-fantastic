const Login = require('../../auth/login')
const Serve = require('../../serve')
const ParseQuery = require('fantastic-utils/parsequery')
const GenerateID = require('../../auth/generateid')
const {get, update} = require('fantastic-utils/db')(require('../../path'))
const GetHTTPData = require('fantastic-utils/gethttpdata')

const success = id => new Promise((resolve, reject) => {
  get({table: 'users', columns: ['user_id', 'role'], conditions: {columns: {session_id: id}}})
  .then(row => {
    if (!row || !row.role === 'admin') return reject()
    row.session_id = id
    resolve(row)
  })
})

const admin = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData(res)
  .then(data => {
    const json = ParseQuery(data)
    Login(res, json)
    .then(id => success(id))
    .then(row => {
      GenerateID().then(admin_id => {
        update({table: 'users', row: {admin_session_id: admin_id}, conditions: {columns: {user_id: row.user_id}}})
        .then(() => {
          res.writeHeader('Set-Cookie', `admin_id=${admin_id};`)
          Serve('admin.html', res)
        })
      })
    })
    .catch(() => res.end("invalid login or user doesn't have admin role"))
  })
}

module.exports = admin