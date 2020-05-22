const FS = require('fs').promises
const Path = require('path')
const CopyConfig = require('./scripts/defaultconfig')

let writing_file

const writeConfig = config => { // FS.writeFile shouldn't be allowed to write more than once at a time, so we have to wait if we're already doing so
  if (!writing_file) {
    writing_file = true
    const path = Path.join(__dirname, 'config')
    FS.access(path)
    .catch(() => CopyConfig())
    .then(() => FS.writeFile(Path.join(path, 'config.json'), JSON.stringify(config, null, 2)))
    .then(() => writing_file = false)
  } else {
    setTimeout(writeConfig, 100)
  }
}

module.exports = writeConfig