const GetPackage = require('./getpackage')
const FS = require('fs').promises
const Path = require('path')
const GetConfigPath = require('./getconfigpath')

const getPackagedData = async (path, key) => {
  const split = path.split('/')
  const package = await GetPackage(split[0])
  const config_path = await GetConfigPath()
  const result = await FS.readFile(Path.join(config_path, 'node_modules', split[0], package[key][split[1]]))
  .then(res => JSON.parse(res))
  if (!result.name) result.name = split[1]
  return result
}

module.exports = getPackagedData