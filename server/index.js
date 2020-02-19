const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const DB = require('./db')
const {fork} = require('child_process')
const GetCommandData = require('./commands/getcommanddata')
const RunCommands = require('./commands/runcommands')
const Files = require('./http/files')
const Nodes = require('./http/nodes')
const GetCommands = require('./http/getcommands')
const PostCommands = require('./http/postcommands')

const main = async () => {

  const config = await FS.readFile('config/config.json').then(res => JSON.parse(res))
  const processes = []

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
  app.post('/commands', (res, req) => commands = PostCommands(res, req, commands))
  app.listen(config.port, () => console.log(`Fantastic Server running on port ${config.port}!`))

  // TODO: we should scan the config directory for new/updated commands so you don't have to restart the server to update them
}

main()