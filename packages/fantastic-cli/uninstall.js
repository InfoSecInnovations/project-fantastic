#!/usr/bin/env node

const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')
const FS = require('fs-extra')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'

const run = async () => {
  try {
    if (process.argv.length < 4) return console.log('please specify the module(s) to uninstall')
    const args = process.argv.slice(3, process.argv.length)
    console.log(`uninstalling ${args.join(', ')}...`)
    await RunProcess(npm_cmd, ['un', ...args], 'npm uninstall failed')
    await FS.readJSON('config.json')
    .then(json => FS.writeJSON('config.json', {
      ...json, 
      assets: {
        ...json.assets,
        packages: json.assets.packages.filter(m => !args.includes(m))
        // TODO: remove force_commands from module
        // TODO: remove default_enable_commands from module
      }
    }, 
    {spaces: '\t'}))
    console.log(`uninstalled ${args.join(', ')}.`)
  }
  catch (err) {
    console.log(err)
  }

}

run()