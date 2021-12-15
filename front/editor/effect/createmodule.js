import LoadModule from './loadmodule'

const FS = require('fs-extra')
const Path = require('path')
const {spawn} = require('child_process')

/**
 * Run a command
 * @param {string} cmd 
 * @param {string[]} args 
 * @param {string} [error_message] Error to prefix exit code
 */
const runProcess = (cmd, args, error_message, cwd) => new Promise((resolve, reject) => {
  const spawned = spawn(cmd, args, { stdio: 'inherit', detached: true, cwd})
  spawned.on('close', code => {
    if (code !== 0) return reject(`${error_message || 'Closed'} with exit code ${code}`)
    resolve()
  })
  spawned.on('error', error => reject(error))
})

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'

export default (state, action, send) => {
  if (!state.newModuleData.name) return alert('Please specify a valid package name!')
  const args = ['init', '-y']
  if (state.newModuleData.org) args.push(`--scope=${state.newModuleData.org}`)
  const dir = Path.join(action.path, state.newModuleData.name)
  FS.ensureDir(dir)
  .then(() => runProcess(npm_cmd, args, 'Failed to initialize npm', dir))
  .then(() => FS.writeJSON(Path.join(dir, 'info.json'), {...{
    name: state.newModuleData.displayName
  }}, {spaces: '\t'}))
  .then(() => LoadModule(state, {module: dir}, send))
  .then(() => FS.readJSON(Path.join(dir, 'package.json')))
  .then(json => {
    send({type: 'mode', mode: 'module'})
    send({type: 'select_module', module: json.name})
  })
}