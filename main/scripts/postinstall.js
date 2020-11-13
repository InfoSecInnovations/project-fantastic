const FS = require('fs-extra')

const run = async () => {
  await FS.remove('data.db')
  await FS.remove('data.db-journal')
  await FS.remove('config')
  await FS.readFile('.version')
  .then(res => FS.writeFile('.current_version', res))
}

run().then(console.log('post install complete!'))