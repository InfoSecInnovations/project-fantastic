#!/usr/bin/env node

const {spawn} = require('child_process')

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
    console.log('Fantastic installed successfully')
  })
})