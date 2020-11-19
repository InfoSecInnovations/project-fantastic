#!/usr/bin/env node

const {spawn} = require('child_process')
const FS = require('fs-extra')
const DefaultConfig = require('./defaultconfig')
const Scripts = require('./scripts')
const Path = require('path')
const ReadLine = require('readline')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'
const modules = [
  '@infosecinnovations/project-fantastic',
  '@infosecinnovations/fantastic-default'
]

const run_process = (cmd, args, error_message) => new Promise((resolve, reject) => {
  const spawned = spawn(cmd, args, { env: process.env, stdio: 'inherit', detached: true })
  spawned.on('close', code => {
    if (code !== 0) return reject(`${error_message || ''} with exit code ${code}`)
    resolve()
  })
})

const get_input = (question, hide) => new Promise((resolve, reject) => {
  const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(question, answer => {
    resolve(answer)
    rl.close()
  })
  if (hide) rl._writeToOutput = () => {}
})

const run = async () => {
  try {
    await run_process(npm_cmd, ['init', '-y'], 'npm init failed')
    let use_ad = await get_input('Use Active Directory for authentication? y/n: ')
    while (!use_ad || !['y', 'yes', 'n', 'no'].find(v => v === use_ad.toLowerCase())) use_ad = await get_input('Please enter y or n!')
    const auth_module = use_ad.toLowerCase().startsWith('y') ? '@infosecinnovations/fantastic-active_directory' : '@infosecinnovations/fantastic-default_auth'
    await run_process(npm_cmd, ['i', ...modules, auth_module], 'npm install failed')
    await Promise.all([
      FS.readJSON('package.json').then(json => FS.writeJSON('package.json', {...json, scripts: {...json.scripts, ...Scripts}})),
      FS.writeJSON('config.json', DefaultConfig),
      FS.copy(Path.join(__dirname, 'cert'), 'cert')
    ])
    await run_process(npx_cmd, ['fantastic-upgrade'], 'npx fantastic-upgrade failed')
    if (auth_module === '@infosecinnovations/fantastic-default_auth') {
      let username = await get_input('Please enter admin account username: ')
      while (!username) username = await get_input('Please enter a valid username: ')
      let password = await get_input('Please enter admin password: ', true)
      while (!password) password = await get_input('Please enter a valid password: ')
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