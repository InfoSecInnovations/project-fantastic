#!/usr/bin/env node

const FS = require('fs-extra')
const DefaultConfig = require('./defaultconfig')
const Scripts = require('./scripts')
const Path = require('path')
const RunProcess = require('./runprocess')
const GetInput = require('./getinput')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'
const modules = [
  '@infosecinnovations/project-fantastic',
  '@infosecinnovations/fantastic-default'
]

const run = async () => {
  try {
    await RunProcess(npm_cmd, ['init', '-y'], 'npm init failed')
    let use_ad = await GetInput('Use Active Directory for authentication? y/n: ')
    while (!use_ad || !['y', 'yes', 'n', 'no'].find(v => v === use_ad.toLowerCase())) use_ad = await GetInput('Please enter y or n!')
    const auth_module = use_ad.toLowerCase().startsWith('y') ? '@infosecinnovations/fantastic-active_directory' : '@infosecinnovations/fantastic-default_auth'
    await RunProcess(npm_cmd, ['i', ...modules, auth_module], 'npm install failed')
    await Promise.all([
      FS.readJSON('package.json').then(json => FS.writeJSON('package.json', {...json, scripts: {...json.scripts, ...Scripts}})),
      FS.writeJSON('config.json', DefaultConfig),
      FS.copy(Path.join(__dirname, 'cert'), 'cert')
    ])
    await RunProcess(npx_cmd, ['fantastic-upgrade'], 'npx fantastic-upgrade failed')
    if (auth_module === '@infosecinnovations/fantastic-default_auth') {
      let username = await GetInput('Please enter admin account username: ')
      while (!username) username = await GetInput('Please enter a valid username: ')
      let password
      let password_check
      let prefix
      while (!password || password != password_check) {
        password = await GetInput(`${prefix ? `${prefix}\n` : ''}Please enter admin password: `, true)
        if (!password) {
          prefix = 'This is not a valid password!'
          continue
        }
        password_check = await GetInput('Confirm password: ', true)
        prefix = "Passwords didn't match!"
      }
      const auth = require(Path.join(process.cwd(), 'node_modules', auth_module))
      await auth.setAdmin({username, password})
    }
    console.log('Fantastic installed successfully')
  }
  catch (err) {
    console.error(err)
  }
}

run()