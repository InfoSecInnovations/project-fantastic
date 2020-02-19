const FS = require('fs-extra')

FS.rmdir('config')
  .then(() => FS.copy('default_config', 'config'))