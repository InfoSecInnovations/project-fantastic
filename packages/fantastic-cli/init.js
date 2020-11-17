#!/usr/bin/env node

const {spawn} = require('child_process')
const FS = require('fs-extra')
const DefaultConfig = require('./defaultconfig')
const Scripts = require('./scripts')
const Path = require('path')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'npx'
const modules = [
  '@infosecinnovations/project-fantastic',
  '@infosecinnovations/fantastic-default',
  '@infosecinnovations/fantastic-default_auth'
]

const run_process = (cmd, args, error_message) => new Promise((resolve, reject) => {
  const spawned = spawn(cmd, args, { env: process.env, stdio: 'inherit', detached: true })
  spawned.on('close', code => {
    if (code !== 0) return reject(`${error_message || ''} with exit code ${code}`)
    resolve()
  })
})

run_process(npm_cmd, ['init', '-y'], 'npm init failed')
.then(() => run_process(npm_cmd, ['install', ...modules], 'npm install failed'))
.then(() => Promise.all([
  FS.readJSON('package.json').then(json => FS.writeJSON('package.json', {...json, scripts: {...json.scripts, ...Scripts}})),
  FS.writeJSON('config.json', DefaultConfig),
  FS.copy(Path.join(__dirname, 'cert'), 'cert')
]))
.then(() => run_process(npx_cmd, ['fantastic-upgrade'], 'npx fantastic-upgrade failed'))
.then(() => console.log('Fantastic installed successfully'))
.catch(err => console.error(err))