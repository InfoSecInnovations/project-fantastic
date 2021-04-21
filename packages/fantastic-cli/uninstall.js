const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')
const FS = require('fs-extra')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'

const uninstall = async modules => {
  try {
    console.log(`uninstalling ${modules.join(', ')}...`)
    await RunProcess(npm_cmd, ['un', ...modules], 'npm uninstall failed')
    await FS.readJSON('config.json')
    .then(json => FS.writeJSON('config.json', {
      ...json, 
      assets: {
        packages: json.assets.packages.filter(m => !modules.includes(m)),
        force_commands: json.assets.force_commands.filter(c => !modules.find(m => c.startsWith(`${m}/`))), // remove any always on commands from the uninstalled modules
        default_enable_commands: json.assets.default_enable_commands.filter(c => !modules.find(m => c.startsWith(`${m}/`))) // remove any default enabled commands from the uninstalled modules
      }
    }, 
    {spaces: '\t'}))
    console.log(`uninstalled ${modules.join(', ')}.`)
  }
  catch (err) {
    console.log(err)
  }

}

module.exports = uninstall