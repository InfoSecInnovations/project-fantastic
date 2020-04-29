const FS = require('fs').promises
const Path = require('path')

const getConfig = () =>
  FS.readFile(Path.join(__dirname, 'config.json'))
  .catch(() => FS.readFile(Path.join(__dirname, 'default_config.json')))
  .then(file => JSON.parse(file))

module.exports = getConfig