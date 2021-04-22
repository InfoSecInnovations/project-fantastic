const update = require('fantastic-cli/update')
const FS = require('fs-extra')

const run = async () => {
  await FS.emptyDir('test')
  process.chdir('test')
  await update('@next')
}

run()