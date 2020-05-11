const GetConfigPath = require('../util/getconfigpath')
const Path = require('path')

const getActionData = async config => {
  if (!config.actions) return []
  const path = await GetConfigPath()
  return config.actions.map(v => {
    const package = require(Path.join(path, 'node_modules', v))
      return Object.keys(package).map(k => `${v}/${k}`)
    }).flat()
}

module.exports = getActionData