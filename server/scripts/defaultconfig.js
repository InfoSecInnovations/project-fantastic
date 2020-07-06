const FS = require('fs-extra')
const Path = require('path')

const server_dir = Path.join(__dirname, '..')
const defaultConfig = () => FS.remove(Path.join(server_dir, 'config'))
  .then(() => FS.copy(Path.join(server_dir, 'default_config'), Path.join(server_dir, 'config_temp')))
  .then(() => FS.rename(Path.join(server_dir, 'config_temp'), Path.join(server_dir, 'config')))

defaultConfig().then(console.log('created config folder.'))