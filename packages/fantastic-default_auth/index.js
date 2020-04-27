const {run} = require('fantastic-utils/db')(require('./path'))
const Schema = require('./schema')
const FS = require('fs').promises
const Path = require('path')

run(Schema).catch(err => console.log(err.message))

const serve = (path, res) => {
  res.onAborted()
  FS.readFile(Path.join(__dirname, path))
  .then(file => res.end(file))
}

const configure = app => {
  app.get('/auth', (res, req) => serve('auth.html', res))
}

module.exports = configure