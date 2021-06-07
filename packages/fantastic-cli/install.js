const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')
const FS = require('fs-extra')
const checkInstalled = require('./checkinstalled')
const GetPackageName = require('./getpackagename')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'

const install = async modules => {
  console.log(`installing ${modules.join(', ')}...`)
  await checkInstalled()
  await RunProcess(npm_cmd, ['i', ...modules], 'npm install failed')
  const packageNames = await Promise.all(modules.map(m => GetPackageName(m)))
  await FS.readJSON('config.json')
  .then(json => FS.writeJSON('config.json', {
    ...json, 
    assets: {
      ...json.assets,
      packages: [
        ...json.assets.packages,
        ...packageNames.filter(m => !json.assets.packages.includes(m))
      ]
    }
  }, 
  {spaces: '\t'}))
  console.log(`installed ${modules.join(', ')}.`)
}

module.exports = install