const GetCommandData = require('./commands/getcommanddata')
const FS = require('fs')
const Path = require('path')
const GetConfig = require('./util/getconfig')

const update_data = onchange => GetConfig()
  .then(async res => onchange({
    config: res,
    command_data: await GetCommandData(res)
  }))

const watchConfig = onchange => {
  let fsWait
  const path = Path.join(__dirname, 'config', 'config.json')
  FS.promises.access(path)
  .then(async () => {
    await update_data(onchange)
    FS.watch(path, (e, filename) => {
      if (filename) {
        if (fsWait) return
        fsWait = setTimeout(() => { // debounce because FS.watch can trigger more than once
          fsWait = false
        }, 100)
        update_data(onchange)
      }
    })
  })
  .catch(() => setTimeout(() => watchConfig(onchange), 200))

}

module.exports = watchConfig