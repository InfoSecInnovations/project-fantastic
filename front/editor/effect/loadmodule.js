const FS = require('fs-extra')
const Path = require('path')

const loadDir = path => FS.readdir(path)
  .then(files => Promise.all(
    files
    .filter(file => file.endsWith('.json'))
    .map(file => FS.readJSON(Path.join(path, file)).then(json => ({key: file, value: json})))
  ))
  .then(files => files.reduce((result, file) => ({...result, [file.key]: file.value}), {}))

export default async (state, action, send) => {
  const actions = await loadDir(Path.join(process.cwd(), '../packages', action.module, 'actions'))
  const tests = await loadDir(Path.join(process.cwd(), '../packages', action.module, 'tests'))
  send({type: 'add_module', module: {name: action.module, actions, tests}})
}