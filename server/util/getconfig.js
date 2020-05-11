const GetConfigPath = require('./getconfigpath')
const Path = require('path')
const FS = require('fs').promises

const getConfig = () => GetConfigPath()
  .then(res => FS.readFile(Path.join(res, 'config.json')))
  .then(res => JSON.parse(res))

module.exports = getConfig