const Login = require('../accounts/login')
const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const Success = require('./success')
const Error = require('./error')
const GetHTTPData = require('@infosecinnovations/fantastic-utils/gethttpdata')

const auth = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData(res)
  .then(data => {
    const json = ParseQuery(data)
    Login(json)
    .then(id => Success(res, id, '/auth'))
    .catch(() => Error(res, 'username or password was invalid!'))
  })
}

module.exports = auth