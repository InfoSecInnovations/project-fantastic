const FS = require('fs').promises
const Path = require('path')

const custom_path = Path.join(__dirname, '../config')
const default_path = Path.join(__dirname, '../default_config')

/**
 * Get the directory of the config package
 */
const getConfigPath = () => FS.access(custom_path)
  .then(() => custom_path, () => default_path)

module.exports = getConfigPath