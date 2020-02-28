const getPackagedAsset = path => {
  const split = path.split('/')
  const mod = require(`../config/node_modules/${split[0]}`)
  const result = mod[split[1]]
  if (!result.name) result.name = split[1]
  return result
}

module.exports = getPackagedAsset