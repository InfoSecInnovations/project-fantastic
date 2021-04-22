const install = require('fantastic-cli/install')
const FS = require('fs-extra')

const run = async () => {
  await FS.emptyDir('test')
  process.chdir('test')
  await install(['../../dummy-module']).catch(err => console.error(err))
}

run()