#!/usr/bin/env node 
const GetConfig = require('../util/getconfig')
const GetPackage = require('../util/getpackage')
const AuthFactory = require('@infosecinnovations/fantastic-auth_factory')
const {spawn} = require('child_process')
const Path = require('path')

const run = async () => {
  console.log('Fantastic Windows Service setup...\n')
  /*let option = await GetInput(`Which account will run the service?
1 - Currently logged in user
2 - Enter account credentials
3 - Managed service account
`)
  let domain, account, password
  while (!option || isNaN(parseInt(option)) || parseInt(option) < 1 || parseInt(option) > 3) option = await GetInput('Please select a valid option!\n')
  option = parseInt(option)
  if (option == 2 || option == 3) {
    domain = await GetInput('Please enter domain or leave blank for local computer: ')
    account = await GetInput('Please enter account name: ')
  }
  if (option == 2) password = await GetInput('Please enter password for account: ', true)
  if (option == 3) {
    password = 'blah'
    if (!account.endsWith('$')) account = `${account}$`
  }*/
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
