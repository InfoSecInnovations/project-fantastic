const FS = require('fs-extra')

const defaultConfig = () => FS.remove('config')
  .then(() => FS.copy('default_config', 'config'))

module.exports = defaultConfig