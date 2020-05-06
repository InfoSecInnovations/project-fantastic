const FS = require('fs').promises
const GetCookie = require('fantastic-utils/getcookie')

const cookie_name = 'session_id'
const auth = header => {
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