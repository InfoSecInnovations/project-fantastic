const FS = require('fs-extra')
const Path = require('path')

export default (state, action, send) => FS.readdir(Path.join(process.cwd(), '../packages')) // TODO: user defined path
  .then(files => Promise.all( // TODO: this filtering is a bit sucky!
    files
    .filter(file => file != 'project-fantastic')
    .map(
      file => FS.readdir(Path.join(process.cwd(), '../packages', file))
      .then(files => ({file, valid: files.some(f => f == 'actions' || f == 'tests')}))
    )
  ))
  .then(files => send({
    type: 'module_names', 
    files: files.filter(file => file.valid).map(file => file.file)
  }))