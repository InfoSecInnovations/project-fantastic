const GetConfigPath = require('./getconfigpath')
const Path = require('path')
const Decache = require('decache')

/**
 * get an npm module installed in the config directory by name
 * @param {string} name 
 */
const getPackage = name => GetConfigPath()
  .then(res => {
    const module_path = Path.join(res, 'node_modules', name)
    Decache(module_path) // we use decache so that changed scripts will reload while the server is running
    return require(module_path)
  })

module.exports = getPackage