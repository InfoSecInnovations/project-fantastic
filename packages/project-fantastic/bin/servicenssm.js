#!/usr/bin/env node 
const GetConfig = require('../util/getconfig')
const GetPackage = require('../util/getpackage')
const AuthFactory = require('@infosecinnovations/fantastic-auth_factory')
const {spawn} = require('child_process')
const Path = require('path')

const run = async () => {
  console.log('Fantastic Windows Service setup...\n')
  const config = await GetConfig()
  const auth = AuthFactory(GetPackage(config.authentication.module))
  console.log('\nAuthentication setup...\n')
  await auth.configure()
  if (auth.serviceInit) await auth.serviceInit()
  await new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', [
      '-ExecutionPolicy',
      'Bypass',
      Path.join(__dirname, '..', 'scripts', 'launch-nssm.ps1')
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
