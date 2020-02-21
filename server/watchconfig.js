const FSPromises = require('fs').promises
const GetCommandData = require('./commands/getcommanddata')
const FS = require('fs')

const watchConfig = onchange => {
  let fsWait
  FS.watch('config/config.json', (e, filename) => {
    if (filename) {
      if (fsWait) return
      fsWait = setTimeout(() => { // debounce because FS.watch can trigger more than once
        fsWait = false
      }, 100)
      FSPromises.readFile('config/config.json')
        .then(res => JSON.parse(res))
        .then(async res => onchange({
          config: res,
          command_data: await GetCommandData(new_config)
        }))
    }
  })
}

module.exports = watchConfig