const FS = require('fs').promises
const Path = require('path')

/**
 * Load a data object from an installed package
 * @param {string} path package_name/object_name
 * @param {'actions' | 'commands' | 'tests'} data_type 
 * @returns {Promise<{} | undefined>}
 */
const getPackagedData = async (path, data_type) => {
  const splitIndex = path.lastIndexOf('/')
  if (splitIndex == -1) return
  const fileName = path.substring(splitIndex + 1)
  const result = await FS.readFile(Path.join('node_modules', path.substring(0, splitIndex), data_type, `${fileName}.json`))
  .then(res => JSON.parse(res))
  if (!result.name) result.name = fileName
  return result
}

module.exports = getPackagedData