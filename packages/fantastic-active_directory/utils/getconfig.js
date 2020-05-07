const FS = require('fs').promises
const Path = require('path')

const getConfig = () =>
  FS.readFile(Path.join(__dirname, '../config.json'))
  .then(file => JSON.parse(file))
  .catch(err => console.log(`Error loading config file: ${err}`))

module.exports = getConfig