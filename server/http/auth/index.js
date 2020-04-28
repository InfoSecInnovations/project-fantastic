const FS = require('fs').promises

const cookie_name = 'session_id'
const auth = (res, req) => {
  const header = req.getHeader('cookie')
  return FS.readFile('config/config.json')
  .then(file => JSON.parse(file))
  .then(config => {
    const index = header.indexOf(cookie_name)
    if (index < 0) return
    const start_index = index + cookie_name.length + 1
    const end_index = header.indexOf(';')
    const session_id = header.slice(start_index, end_index > 0 ? end_index : undefined)
    const auth_module = require(`../../config/node_modules/${config.authentication}`)
    return auth_module.verify(session_id)
  })
}
module.exports = auth