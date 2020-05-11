const GetConfigPath = require('../util/getconfigpath')
const Path = require('path')

const getCommandData = async config => {
  if (!config.data_sources) return {}
  const path = await GetConfigPath()
  return Object.entries(config.data_sources).map(v => {
    const package = require(Path.join(path, 'node_modules', v[0]))
    return Object.keys(package).map(k => ({[`${v[0]}/${k}`]: v[1].includes(k)}))
  }).flat().reduce((result, v, i, arr) => ({...result, ...v}), {})
}

module.exports = getCommandData