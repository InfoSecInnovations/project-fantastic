const FS = require('fs').promises
const GetCookie = require('fantastic-utils/getcookie')

const redirect = res => {
  res.writeStatus('302 Found')
  res.writeHeader('Location', '/auth')
  res.end()
}

const cookie_name = 'session_id'
const logOut = (res, req) => {
  res.onAborted(() => res.aborted = true)
  const header = req.getHeader('cookie')
  return FS.readFile('config/config.json')
  .then(file => JSON.parse(file))
  .then(config => {
    const session_id = GetCookie(header, cookie_name)
    const auth_module = require(`../../config/node_modules/${config.authentication}`)
    auth_module.invalidate(session_id)
    return redirect(res)
  })
}
module.exports = logOut