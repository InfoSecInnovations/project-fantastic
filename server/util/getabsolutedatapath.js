/**
 * If we're loading data relative to another module, join the parent path if needed
 * @param {string} path path we're trying to load
 * @param {string} parent_path path of the module this path should be relative to
 */
const getAbsoluteDataPath = (path, parent_path) => path.includes('/') ? path : `${parent_path.split('/')[0]}/${path}`

module.exports = getAbsoluteDataPath