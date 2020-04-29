const Login = require('../../auth/login')
const Serve = require('../../serve')
const ParseQuery = require('fantastic-utils/parsequery')

const success = (res, id) => {
  res.writeHeader('Set-Cookie', `session_id=${id}`)
  Serve('admin.html', res)
}

const admin = (res, req) => {
  res.onAborted(() => res.aborted = true)
  let buffer
  res.onData((data, isLast) => {
    let chunk = Buffer.from(data)
    buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])
    if (isLast) {
      const json = ParseQuery(buffer.toString())
      Login(res, json, success)
    }
  })
}

module.exports = admin