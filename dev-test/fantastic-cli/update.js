const init = require('fantastic-cli/init')
const update = require('fantastic-cli/update')
const FS = require('fs-extra')

const run = async () => {
  await FS.emptyDir('test')
  process.chdir('test')
  await init('@0.4.0')
  await update('@next')
}

run()