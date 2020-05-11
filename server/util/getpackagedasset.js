const Decache = require('decache')
const GetConfigPath = require('./getconfigpath')
const Path = require('path')

const getPackagedAsset = path => 
  GetConfigPath()
  .then(res => {
    const split = path.split('/')
    const mod_path = Path.join(res, 'node_modules', split[0])
    Decache(mod_path) // we use decache so that changed scripts will reload while the server is running
    const mod = require(mod_path)
    const result = mod[split[1]]
    if (!result.name) result.name = split[1]
    return result
  })

module.exports = getPackagedAsset