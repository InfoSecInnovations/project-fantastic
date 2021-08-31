#!/usr/bin/env node
const InitService = require('../service/initservice')  
const GetConfig = require('../util/getconfig')
const GetPackage = require('../util/getpackage')
const AuthFactory = require('@infosecinnovations/fantastic-auth_factory')
const GetInput = require('../../fantastic-utils/getinput')

const run = async () => {
  console.log('Fantastic Windows Service setup...\n')
  const config = await GetConfig()
  const auth = AuthFactory(GetPackage(config.authentication.module))
  console.log('\nAuthentication setup...\n')
  await auth.configure()
  if (auth.serviceInit) await auth.serviceInit()
  const svc = InitService()
  svc.on('install', () => {
    console.log('Launching Fantastic service...')
    svc.start()
  })
  svc.install()
}

run()
