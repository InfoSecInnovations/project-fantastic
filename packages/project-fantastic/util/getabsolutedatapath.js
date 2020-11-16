/**
 * If we're loading data relative to another module, join the parent path if needed
 * @param {string} path path we're trying to load
 * @param {string} parent_path path of the module this path should be relative to
 */
const getAbsoluteDataPath = (path, parent_path) => path.includes('/') ? 
  path : 
  `${parent_path.substring(0, parent_path.lastIndexOf('/'))}/${path}`

module.exports = getAbsoluteDataPath