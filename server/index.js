const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const DB = require('./db')
const {fork} = require('child_process')
const GetCommandData = require('./commands/getcommanddata')
const RunCommands = require('./commands/runcommands')
const GetActionData = require('./actions/getactiondata')
const Files = require('./http/files')
const GetNodes = require('./http/getnodes')
const GetCommands = require('./http/getcommands')
const PostCommands = require('./http/postcommands')
const GetActions = require('./http/getactions')
const PostActions = require('./http/postactions')
const PostActionFollowup = require('./http/postactionfollowup')
const WatchConfig = require('./watchconfig')
const WriteConfig = require('./writeconfig')
const GetResults = require('./http/getresults')
const Net = require('net')

const main = async () => {

  let config = await FS.readFile('config/config.json').then(res => JSON.parse(res))
  const processes = []

  let command_data = await GetCommandData(config)
  let actions = await GetActionData(config)

  DB.init()
  .then(() => {
    // TODO: get child process working with commands and actions
    /*if (config.child_process) {
      const get_data = fork('./getdata.js', [], {execArgv: []}) // execArgv is a workaround to not break the VSCode debugger
      processes.push(get_data)
      get_data.on('error', err => console.log(err.message))
    }
    else {*/
      RunCommands(() => command_data)
    //}
  })

  process.on('exit', () => processes.forEach(v => v.kill()))

  const http_port = config.port + 1
  const https_port = config.port + 2

  /*Net.createServer((conn) => {
    conn.once('data', buf => {
      // A TLS handshake record starts with byte 22.
      const address = (buf[0] === 22) ? https_port : http_port
      const proxy = Net.createConnection(address, function () {
          proxy.write(buf);
          conn.pipe(proxy).pipe(conn)
      })
    })
  }).listen(config.port).on('listening', () => console.log(`Proxy server listening on port ${config.port}`))*/

  const app = UWS.SSLApp({
    key_file_name: 'cert/key',
    cert_file_name: 'cert/cert'
  })
  app.get('/*', Files)
  app.get('/nodes', GetNodes)
  app.get('/commands', (res, req) => GetCommands(res, req, command_data))
  app.post('/commands', (res, req) => {
    command_data = PostCommands(res, req, command_data)
    config.data_sources = Object.entries(command_data).filter(v => v[1]).reduce((result, v) => {
      const split = v[0].split('/')
      if (!result[split[0]]) result[split[0]] = []
      result[split[0]].push(split[1])
      return result
    }, {})
    WriteConfig(config)
  })
  app.get('/actions', (res, req) => GetActions(res, req, actions))
  app.post('/actions', PostActions)
  app.post('/action_followup', PostActionFollowup)
  app.get('/results', GetResults)
  app.listen(config.port, () => console.log(`Fantastic Server running on port ${config.port}!`))

  /*const http_app = UWS.App()
  http_app.get('/*', (res, req) => {
    res.writeStatus('301')
    res.writeHeader('Location', `https://${req.getHeader('host')}${req.getUrl()}`)
    res.end()
  })
  http_app.listen(http_port, () => console.log(`HTTP redirect server running on port ${http_port}`))*/

  // reload config and command data if it changed
  WatchConfig(data => {
    config = data.config
    command_data = data.command_data
    console.log('config.json changed, got new data')
  })

}

main()