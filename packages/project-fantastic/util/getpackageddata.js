const FS = require('fs').promises
const Path = require('path')

/**
 * Load a data object from an installed package
 * @param {string} path package_name/object_name
 * @param {'actions' | 'commands' | 'scans' | 'stories'} data_type 
 * @returns {Promise<{} | undefined>}
 */
const getPackagedData = async (path, data_type) => {
  const splitIndex = path.lastIndexOf('/')
  if (splitIndex == -1) return
  const fileName = path.substring(splitIndex + 1)
  // TODO: is there some way to use require.resolve to make this more robust?
  const result = await FS.readFile(Path.join('node_modules', path.substring(0, splitIndex), data_type, `${fileName}.json`))
  .then(res => JSON.parse(res))
  .catch(() => undefined)
  if (!result) return
  if (!result.name) result.name = fileName
  if (data_type == 'stories' && (!result.selection.age || !Object.keys(result.selection.age).length)) result.selection.age = {d: 1}
  if (data_type == 'quests' && (!result.selection.age || !Object.keys(result.selection.age).length)) result.selection.age = {d:1}
  result.module = path.substring(0, splitIndex)
  return result
}

module.exports = getPackagedData