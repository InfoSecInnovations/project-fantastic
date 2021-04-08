#!/usr/bin/env node

const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')
const FS = require('fs-extra')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'
const npx_cmd = process.platform === 'win32'? 'npx.cmd' : 'npm'

const run = async () => {
  try {
    if (process.argv.length < 4) return console.log('please specify the module(s) to install')
    const args = process.argv.slice(3, process.argv.length)
    console.log(`installing ${args.join(', ')}...`)
    await RunProcess(npm_cmd, ['i', ...args], 'npm install failed')
    const modules = args.map(m => m.replace(/.(@.+)/, (match, p1) => match.replace(p1, ''))) // strip out version from module name if there is one)
    await FS.readJSON('config.json')
    .then(json => FS.writeJSON('config.json', {
      ...json, 
      assets: {
        ...json.assets,
        packages: [
          ...json.assets.packages,
          ...modules.filter(m => !json.assets.packages.includes(m))
        ]
      }
    }, 
    {spaces: '\t'}))
    console.log(`installed ${args.join(', ')}.`)
  }
  catch (err) {
    console.log(err)
  }

}

run()