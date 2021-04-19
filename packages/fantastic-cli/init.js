#!/usr/bin/env node

const FS = require('fs-extra')
const DefaultConfig = require('./defaultconfig')
const Scripts = require('./scripts')
const Path = require('path')
const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')
const GetInput = require('@infosecinnovations/fantastic-utils/getinput')
const AuthFactory = require('@infosecinnovations/fantastic-auth_factory')
const GetPackageName = require('./getpackagename')
const RunPowershell = require('@infosecinnovations/fantastic-powershell/runpowershell')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'
const modules = [
  '@infosecinnovations/project-fantastic',
  '@infosecinnovations/fantastic-default'
]
const auth_modules = [
  '@infosecinnovations/fantastic-default_auth',
  '@infosecinnovations/fantastic-active_directory'
]

const run = async () => {
  try {
    const args = process.argv.slice(3, process.argv.length)
    let tag = args[0] || '@latest'
    if (!tag.startsWith('@')) tag = `@${tag}`
    console.log(`Installing Fantastic from ${tag} tag`)
    try {
      await RunProcess('git', ['--version'])
    }
    catch (err) {
      console.log('installing Git...')
      await RunPowershell(Path.join(__dirname, 'installers', 'git-installer.ps1'))
      console.log('Git installed, refreshing environment...')
      await RunPowershell('$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")')
      console.log('Git install complete, proceeding with Fantastic installation...')
    }
    await RunProcess(npm_cmd, ['init', '-y'], 'npm init failed')
    // we want to display 1 based indices in the command line but use 0 based to access the array
    const custom = auth_modules.length + 1
    let use_auth = await GetInput(`Select authentication module:\n${auth_modules.map((m, i) => `${i+1} - ${m}`).join('\n')}\n${custom} - Custom\n`)
    while (!use_auth || isNaN(parseInt(use_auth)) || parseInt(use_auth) > custom) use_auth = await GetInput('Please enter a valid choice!')
    const auth_module = parseInt(use_auth) != custom ? `${auth_modules[parseInt(use_auth) - 1]}${tag}` : await GetInput('Enter module name: ')
    await RunProcess(npm_cmd, ['i', ...modules.map(m => `${m}${tag}`), auth_module], 'npm install failed')
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
  catch (err) {
    console.error(err)
  }
}

run()