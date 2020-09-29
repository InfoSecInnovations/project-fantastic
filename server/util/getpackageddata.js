const GetPackage = require('./getpackage')
const FS = require('fs').promises
const Path = require('path')
const GetConfigPath = require('./getconfigpath')

/**
 * Load a data object from a package installed in the config directory
 * @param {string} path package_name/object_name
 * @param {'actions' | 'commands' | 'tests'} data_type 
 * @returns {{} | undefined}
 */
const getPackagedData = async (path, data_type) => {
  const split = path.split('/')
  if (split.length !== 2) return
  const package_obj = await GetPackage(split[0])
  if (!package_obj) return
  const config_path = await GetConfigPath()
  const result = await FS.readFile(Path.join(config_path, 'node_modules', split[0], package_obj[data_type][split[1]]))
  .then(res => JSON.parse(res))
  if (!result.name) result.name = split[1]
  return result
}

module.exports = getPackagedData