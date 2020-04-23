const auth = (res, req, config) => {
  const auth_module = require(`../config/node_modules/${config.authentication}`)
  return auth_module(req)
}
module.exports = auth