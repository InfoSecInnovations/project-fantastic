const auth = (res, req, config) => {

  // TODO: check cookies for actual ID
  const id = 0
  const auth_module = require(`../config/node_modules/${config.authentication}`)
  const role = auth_module.verify(id)
  return {id, role}
}
module.exports = auth