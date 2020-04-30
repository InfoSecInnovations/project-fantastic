const Login = require('./login')
const ParseQuery = require('fantastic-utils/parsequery')
const Success = require('./success')
const GetHTTPData = require('fantastic-utils/gethttpdata')

const invalid_login = 'username or password was invalid! TODO: redirect to auth page with this message'

const auth = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData(res)
  .then(data => {
    const json = ParseQuery(data)
    Login(res, json)
    .then(id => Success(res, id))
    .catch(() => res.end(invalid_login))
  })
}

module.exports = auth