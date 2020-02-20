const UWS = require('uWebSockets.js')
const FSPromises = require('fs').promises
const FS = require('fs')
const DB = require('./db')
const {fork} = require('child_process')
const GetCommandData = require('./commands/getcommanddata')
const RunCommands = require('./commands/runcommands')
const Files = require('./http/files')
const Nodes = require('./http/nodes')
const GetCommands = require('./http/getcommands')
const PostCommands = require('./http/postcommands')

const main = async () => {

  let config = await FSPromises.readFile('config/config.json').then(res => JSON.parse(res))
  const processes = []
  let writing_file

  let commands = await GetCommandData(config)

  DB.init()
  .then(() => {
    // TODO: get child process working with the command list
    /*if (config.child_process) {
      const get_data = fork('./getdata.js', [], {execArgv: []}) // execArgv is a workaround to not break the VSCode debugger
      processes.push(get_data)
      get_data.on('error', err => console.log(err.message))
    }
    else {*/
      RunCommands(() => commands)
    //}
  })

  process.on('exit', () => processes.forEach(v => v.kill()))

  const app = UWS.App()
  app.get('/*', Files)
  app.get('/nodes', Nodes)
  app.get('/commands', (res, req) => GetCommands(res, req, commands))
  app.post('/commands', (res, req) => {
    commands = PostCommands(res, req, commands)
    config.data_sources = Object.entries(commands).filter(v => v[1]).map(v => v[0])
    const write = () => { // FS.writeFile shouldn't be allowed to write more than once at a time, so we have to wait if we're already doing so
      if (!writing_file) {
        writing_file = true
        FSPromises.writeFile('config/config.json', JSON.stringify(config, null, 2))
          .then(writing_file = false)
      } else {
        setTimeout(write, 100)
      }
    }
    write()
  })
  app.listen(config.port, () => console.log(`Fantastic Server running on port ${config.port}!`))

  // reload config if it changed
  let fsWait
  FS.watch('config/config.json', (e, filename) => {
    if (filename) {
      if (fsWait) return
      fsWait = setTimeout(() => { // debounce because FS.watch can trigger more than once
        fsWait = false
      }, 100)
      FSPromises.readFile('config/config.json')
        .then(res => JSON.parse(res))
        .then(res => {
          config = res
          return GetCommandData(res)
        })
        .then(res => {
          commands = res
          console.log('config.json changed, got new data')
        })
    }
  })

}

main()