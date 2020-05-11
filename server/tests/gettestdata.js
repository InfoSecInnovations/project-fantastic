const GetConfigPath = require('../util/getconfigpath')
const Path = require('path')

const getTestData = async config => {
  if (!config.tests) return []
  const path = await GetConfigPath()
  return config.tests.map(v => {
    const package = require(Path.join(path, 'node_modules', v))
    return Object.keys(package).map(k => `${v}/${k}`)
  }).flat()
}

module.exports = getTestData