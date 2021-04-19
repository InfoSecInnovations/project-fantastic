const FS = require('fs-extra')
const RunProcess = require('@infosecinnovations/fantastic-utils/runprocess')

const npm_cmd = process.platform === 'win32'? 'npm.cmd' : 'npm'

const run = async () => {
  await FS.emptyDir('test')
  process.chdir('test')
  await RunProcess(npm_cmd, ['init', '-y'], 'npm init failed')
  await RunProcess(npm_cmd, ['i', '@infosecinnovations/project-fantastic'], 'failed to install Fantastic')
  require('fantastic-cli/update')
}

run()