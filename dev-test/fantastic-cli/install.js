const init = require('fantastic-cli/init')
const install = require('fantastic-cli/install')
const FS = require('fs-extra')

const run = async () => {
  await FS.emptyDir('test')
  process.chdir('test')
  await init('@next')
  await install(['../../dummy-module'])
}

run()