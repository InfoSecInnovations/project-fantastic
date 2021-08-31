#!/usr/bin/env node 
const {spawn} = require("child_process")
const Path = require("path")

const run = async () => {
  await new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', [
      '-ExecutionPolicy',
      'Bypass',
      Path.join(__dirname, '..', 'scripts', 'rm-nssm.ps1')
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
}

run()