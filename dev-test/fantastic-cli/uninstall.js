const init = require('fantastic-cli/init')
const install = require('fantastic-cli/install')
const uninstall = require('fantastic-cli/uninstall')
const FS = require('fs-extra')

const run = async () => {
  await FS.emptyDir('test')
  process.chdir('test')
  await init('@next')
  await install(['../../dummy-module'])
  await uninstall(['dummy-module'])
}

run()