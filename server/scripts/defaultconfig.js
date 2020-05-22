const FS = require('fs-extra')

const defaultConfig = () => FS.remove('config')
  .then(() => FS.copy('default_config', 'config_temp'))
  .then(() => FS.rename('config_temp', 'config'))

module.exports = defaultConfig