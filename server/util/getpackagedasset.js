const Decache = require('decache')

const getPackagedAsset = path => {
  const split = path.split('/')
  const mod_path = `../config/node_modules/${split[0]}`
  const mod = require(mod_path)
  Decache(mod_path) // we use decache so that changed scripts will reload while the server is running
  const result = mod[split[1]]
  if (!result.name) result.name = split[1]
  return result
}

module.exports = getPackagedAsset