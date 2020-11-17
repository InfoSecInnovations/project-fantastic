#!/usr/bin/env node

const {spawn} = require('child_process')
const FS = require('fs-extra')
const DefaultConfig = require('./defaultconfig')
const Scripts = require('./scripts')

const cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const modules = [
  '@infosecinnovations/project-fantastic',
  '@infosecinnovations/fantastic-default',
  '@infosecinnovations/fantastic-default_auth'
]

const init = spawn(cmd, ['init', '-y'], { env: process.env, stdio: 'inherit', detached: true })
init.on('close', code => {
  if (code !== 0) return console.error(`npm init failed with exit code ${code}`)
  const install = spawn(cmd, ['install', ...modules], { env: process.env, stdio: 'inherit', detached: true })
  install.on('close', code => {
    if (code !== 0) return console.error(`npm install failed with exit code ${code}`)
    Promise.all([
      FS.readJSON('package.json').then(json => FS.writeJSON('package.json', {...json, scripts: {...json.scripts, ...Scripts}})),
      FS.writeJSON('config.json', DefaultConfig)
    ])
    .then(() => console.log('Fantastic installed successfully'))  
  })
})