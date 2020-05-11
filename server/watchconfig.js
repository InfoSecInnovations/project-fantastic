const GetCommandData = require('./commands/getcommanddata')
const FS = require('fs')
const GetConfigPath = require('./util/getconfigpath')
const Path = require('path')
const GetConfig = require('./util/getconfig')

const watchConfig = async onchange => {
  let fsWait
  const path = await GetConfigPath().then(res => Path.join(res, 'config.json'))
  FS.watch(path, (e, filename) => {
    if (filename) {
      if (fsWait) return
      fsWait = setTimeout(() => { // debounce because FS.watch can trigger more than once
        fsWait = false
      }, 100)
      GetConfig()
      .then(async res => onchange({
        config: res,
        command_data: await GetCommandData(res)
      }))
    }
  })
}

module.exports = watchConfig