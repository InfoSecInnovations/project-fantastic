const GetHTTPData = require('fantastic-utils/gethttpdata')
const Login = require('../accounts/login')
const SetPassword = require('../accounts/setpassword')

const changePassword = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData(res)
  .then(data => {
    const json = JSON.parse(data)
    Login(res, json)
    .then(id => {
      SetPassword(json.username, json.new_password)
      .then(() => {
        res.writeStatus('302 Found')
        res.writeHeader('Location', '/auth')
        res.writeHeader('Set-Cookie', `session_id=${id}; Secure; HttpOnly; Path=/;`)
        res.end()
      })
    })
    .catch(() => {})
  })
}

module.exports = changePassword