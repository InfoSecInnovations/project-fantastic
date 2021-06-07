const FS = require('fs-extra')
const Path = require('path')

const getPackageName = path => {
  if (path.startsWith('.') || path.startsWith('/') || path.startsWith('~')) return FS.readJSON(Path.join(path, 'package.json')).then(file => file.name) // this is a local path
  return Promise.resolve(path.replace(/.(@.+)/, (match, p1) => match.replace(p1, ''))) // strip out version from module name if this is from npm
}

module.exports = getPackageName