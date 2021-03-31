const FS = require('fs-extra')
const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')
const Scripts = require('fantastic-cli/scripts')
const Path = require('path')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'

const modules = [
  '@infosecinnovations/project-fantastic',
  '@infosecinnovations/fantastic-default_auth',
  '@infosecinnovations/fantastic-default'
]

const run = async () => {
  console.log('this script will install Fantastic 0.4.0, and then attempt to upgrade the installation to the latest version.')
  await FS.emptyDir('test')
  process.chdir('test')
  await RunProcess(npm_cmd, ['init', '-y'], 'npm init failed')
  await RunProcess(npm_cmd, ['i', ...modules.map(m => `${m}@0.4.0`)], 'npm install failed')
  await Promise.all([
    FS.readJSON('package.json').then(json => FS.writeJSON('package.json', {...json, scripts: {...json.scripts, ...Scripts}}, {spaces: '\t'})),
    FS.copy(Path.join(__dirname, 'config.json'), 'config.json'),
    FS.copy(Path.join(__dirname, 'cert'), 'cert')
  ])
  await RunProcess(npx_cmd, ['fantastic-upgrade'], 'npx fantastic-upgrade failed')
  require('fantastic-cli/update')
}

run()