const init = require('fantastic-cli/init')
const FS = require('fs-extra')

const run = async () => {
  await FS.emptyDir('test')
  process.chdir('test')
  await init('@next')
}

run()