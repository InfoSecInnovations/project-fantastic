#!/usr/bin/env node
const InitService = require('../service/initservice')

const svc = InitService()

svc.on('uninstall', () => {
    console.log('Uninstalled Fantastic Service')
})

svc.uninstall()