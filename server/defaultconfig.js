const FS = require('fs-extra')

FS.remove('config')
  .then(() => FS.copy('default_config', 'config'))