const FS = require('fs').promises
const GetCookie = require('fantastic-utils/getcookie')

const cookie_name = 'session_id'
const auth = (res, req) => {
  const header = req.getHeader('cookie')
  return FS.readFile('config/config.json')
  .then(file => JSON.parse(file))
  .then(config => {
    const session_id = GetCookie(header, cookie_name)
    if (!session_id) return
    const auth_module = require(`../../config/node_modules/${config.authentication}`)
    return auth_module.verify(session_id)
  })
}
module.exports = auth