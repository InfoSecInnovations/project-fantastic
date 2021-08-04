#!/usr/bin/env node
const InitService = require('../service/initservice')  
const GetConfig = require('../util/getconfig')
const GetPackage = require('../util/getpackage')
const AuthFactory = require('@infosecinnovations/fantastic-auth_factory')

const run = async () => {
    const config = await GetConfig()
    const auth = AuthFactory(GetPackage(config.authentication.module))
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
