const Decache = require('decache')
const Path = require('path')

/**
 * get an npm module by name
 * @param {string} name 
 */
const getPackage = name => {
  const path = Path.join(process.cwd(), 'node_modules', name)
  Decache(path) // we use decache so that changed scripts will reload while the server is running
  return require(path)
}

module.exports = getPackage