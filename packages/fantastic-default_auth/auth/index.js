const Login = require('./login')
const Register = require('./register')
const ParseQuery = require('fantastic-utils/parsequery')
const Success = require('./success')

const invalid_login = 'username or password was invalid! TODO: redirect to auth page with this message'

const auth = (res, req) => {
  res.onAborted(() => res.aborted = true)
  let buffer
  res.onData((data, isLast) => {
    let chunk = Buffer.from(data)
    buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])
    if (isLast) {
      const json = ParseQuery(buffer.toString())
      if (json.login) Login(res, json)
        .then(() => Success(res))
        .catch(() => res.end(invalid_login))
      if (json.register) Register(res, json)
    }
  })
}

module.exports = auth