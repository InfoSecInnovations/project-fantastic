const init = require('fantastic-cli/init')
const install = require('fantastic-cli/install')
const uninstall = require('fantastic-cli/uninstall')
const update = require('fantastic-cli/update')
const FS = require('fs-extra')

const run = async () => {
  await FS.emptyDir('test')
  process.chdir('test')
  await init('@0.4.0')
  await update('@next')
  await install(['../../dummy-module'])
  await uninstall(['dummy-module'])
}

run()