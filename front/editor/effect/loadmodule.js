const FS = require('fs-extra')
const Path = require('path')

const loadDir = path => FS.readdir(path)
  .then(files => Promise.all(
    files
    .filter(file => file.endsWith('.json'))
    .map(file => FS.readJSON(Path.join(path, file)).then(json => ({key: file.slice(0, file.lastIndexOf('.json')), value: json})))
  ))
  .then(files => files.reduce((result, file) => ({...result, [file.key]: file.value}), {}))

export default async (state, action, send, warn = true) => {
  const packageJSON = await FS.readJSON(Path.join(action.module, 'package.json')).catch(() => undefined)
  if (!packageJSON) return warn && alert('This directory is not a valid package. Use npm init to create a package.json file.')
  const actions = await loadDir(Path.join(action.module, 'actions')).catch(() => ({}))
  const scans = await loadDir(Path.join(action.module, 'scans')).catch(() => ({}))
  const stories = await loadDir(Path.join(action.module, 'stories')).catch(() => ({}))
  const commands = await loadDir(Path.join(action.module, 'commands')).catch(() => ({}))
  const info = await FS.readJSON(Path.join(action.module, 'info.json')).catch(() => undefined)
  const name = packageJSON.name
  send({type: 'add_module', module: {name, path: action.module, actions, scans, stories, commands, info}})
  const existingData = localStorage.getItem('modulePaths')
  localStorage.setItem('modulePaths', JSON.stringify({...(existingData && JSON.parse(existingData)), [name]: action.module}))
}