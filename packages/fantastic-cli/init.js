const FS = require('fs-extra')
const DefaultConfig = require('./defaultconfig')
const Scripts = require('./scripts')
const Path = require('path')
const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')
const GetInput = require('@infosecinnovations/fantastic-utils/getinput')
const AuthFactory = require('@infosecinnovations/fantastic-auth_factory')
const GetPackageName = require('./getpackagename')
const { spawn } = require('child_process')

const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'
const modules = [
  '@infosecinnovations/project-fantastic',
  '@infosecinnovations/fantastic-default'
]
const auth_modules = [
  '@infosecinnovations/fantastic-default_auth',
  '@infosecinnovations/fantastic-active_directory'
]

const init = async tag => {
  if (!tag.startsWith('@')) tag = `@${tag}`
  console.log(`Installing Fantastic from ${tag} tag`)
  // we want to display 1 based indices in the command line but use 0 based to access the array
  const custom = auth_modules.length + 1
  let use_auth = await GetInput(`Select authentication module:\n${auth_modules.map((m, i) => `${i+1} - ${m}`).join('\n')}\n${custom} - Custom\n`)
  while (!use_auth || isNaN(parseInt(use_auth)) || parseInt(use_auth) > custom) use_auth = await GetInput('Please enter a valid choice!')
  const auth_module = parseInt(use_auth) != custom ? `${auth_modules[parseInt(use_auth) - 1]}${tag}` : await GetInput('Enter module name: ')
  // the fantastic installer installs git if needed, then the required npm modules
  await new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', [
      '-ExecutionPolicy',
      'Bypass',
      Path.join(__dirname, 'installers', 'fantastic-installer.ps1'),
      ...modules.map(m => `${m}${tag}`),
      auth_module
    ], {
      stdio: 'inherit',
      detached: false
    })
    child.on('close', code => {
      if (code !== 0) return reject(`Exit code ${code}`)
      resolve()
    })
    child.on('error', error => reject(error))
  })
  await RunProcess('powershell.exe', ['-ExecutionPolicy', 'Bypass', Path.join(__dirname, 'installers', 'fantastic-installer.ps1'), ...modules.map(m => `${m}${tag}`), auth_module])
  const module_path = await GetPackageName(auth_module)
  await Promise.all([
    FS.readJSON('package.json').then(json => FS.writeJSON('package.json', {...json, scripts: {...json.scripts, ...Scripts}}, {spaces: '\t'})),
    FS.writeJSON('config.json', {...DefaultConfig, authentication: {module: module_path}}, {spaces: '\t'}),
    FS.copy(Path.join(__dirname, 'cert'), 'cert')
  ])
  await RunProcess(npx_cmd, ['fantastic-upgrade'], 'npx fantastic-upgrade failed')

  const auth = AuthFactory(require(Path.join(process.cwd(), 'node_modules', module_path)))
  if (auth.configure) await auth.configure()
  console.log('Fantastic installed successfully')
}

module.exports = init