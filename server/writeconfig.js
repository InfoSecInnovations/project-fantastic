const FS = require('fs').promises
const GetConfigPath = require('./util/getconfigpath')
const Path = require('path')

let writing_file

const writeConfig = config => { // FS.writeFile shouldn't be allowed to write more than once at a time, so we have to wait if we're already doing so
  if (!writing_file) {
    writing_file = true
    GetConfigPath()
    .then(res => FS.writeFile(Path.join(res, 'config.json'), JSON.stringify(config, null, 2)))
    .then(() => writing_file = false)
  } else {
    setTimeout(writeConfig, 100)
  }
}

module.exports = writeConfig