#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const init = require('./init')
const update = require('./update')
const install = require('./install')
const uninstall = require('./uninstall')

yargs(hideBin(process.argv))
.scriptName('fantastic-cli')
.command('init [tag]', 'create a new installation of Fantastic', yargs => yargs.positional(
  'tag', {
    describe: 'the npm tag for the version you wish to install',
    default: '@latest'
  }), argv => {
  init(argv.tag).catch(err => console.error(err))
})
.command('update [tag]', 'update an existing installation of Fantastic', yargs => yargs.positional(
  'tag', {
    describe: 'the npm tag for the version you wish to update to',
    default: '@latest'
  }), argv => {
  update(argv.tag).catch(err => console.error(err))
})
.command('install <packages...>', 'add content module packages to Fantastic', yargs => yargs.positional(
  'packages', {
    describe: 'the npm packages you wish to add to Fantastic'
  }), argv => {
    install(argv.packages).catch(err => console.error(err))
})
.command('uninstall <packages...>', 'remove content module packages from Fantastic', yargs => yargs.positional(
  'packages', {
    describe: 'the npm packages you wish to remove from Fantastic'
  }), argv => {
    uninstall(argv.packages).catch(err => console.error(err))
})
.argv