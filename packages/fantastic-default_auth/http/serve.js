const FS = require('fs').promises
const Path = require('path')

const serve = (path, res) => {
  res.onAborted(() => res.aborted = true)
  FS.readFile(Path.join(__dirname, '../files', path))
  .then(file => res.end(file))
}

module.exports = serve