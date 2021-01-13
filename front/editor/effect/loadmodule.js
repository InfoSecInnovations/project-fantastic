const FS = require('fs-extra')
const Path = require('path')

const loadDir = path => FS.readdir(path)
  .then(files => Promise.all(
    files
    .filter(file => file.endsWith('.json'))
    .map(file => FS.readJSON(Path.join(path, file)).then(json => ({key: file.slice(0, file.lastIndexOf('.json')), value: json})))
  ))
  .then(files => files.reduce((result, file) => ({...result, [file.key]: file.value}), {}))

export default async (state, action, send) => {
  const packageJSON = await FS.readJSON(Path.join(action.module, 'package.json')).catch(() => undefined)
  if (!packageJSON) return alert('This directory is not a valid package. Use npm init to create a package.json file.')
  const actions = await loadDir(Path.join(action.module, 'actions'))
  .catch(() => ({}))
  .then(actions => 
    Object.entries(actions)
    .filter(action => (!action[1].target || action[1].target == 'host') && !action[1].functions.run.result) //filter for host actions with no result
    .reduce((result, action) => ({...result, [action[0]]: action[1]}), {})
  )
  const tests = await loadDir(Path.join(action.module, 'tests')).catch(() => ({}))
  const name = packageJSON.name
  send({type: 'add_module', module: {name, path: action.module, actions, tests}})
}