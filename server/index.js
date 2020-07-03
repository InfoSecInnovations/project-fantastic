const UWS = require('uWebSockets.js')
const HTTPolyglot = require('httpolyglot')
const DB = require('./db')
const {fork} = require('child_process')
const GetCommandData = require('./commands/getcommanddata')
const RunCommands = require('./commands/runcommands')
const GetActionData = require('./actions/getactiondata')
const GetQuestData = require('./quests/getquestdata')
const GetTestData = require('./tests/gettestdata')
const GetConfig = require('./util/getconfig')
const WatchConfig = require('./watchconfig')
const GetPackage = require('./util/getpackage')
const FS = require('fs')
const Path = require('path')
const IsAdmin = require('is-admin')

const main = async () => {

  const is_admin = await IsAdmin()
  if (!is_admin) return console.log('ADMINISTRATOR ACCESS REQUIRED: Please run as administrator!')
  const version = await FS.promises.readFile('.version').then(res => parseInt(res))
  const current_version = await FS.promises.readFile('.current_version').then(res => parseInt(res)).catch(() => 0)
  if (version != current_version) return console.log('VERSION MISMATCH: Please run npm i to update your installation to the latest version!')

  let config = await GetConfig()
  let data_process
  let command_data
  let actions = await GetActionData(config)
  let tests = await GetTestData(config)

  const update_commands = commands => {
    if (data_process) data_process.send({type: 'commands', commands})
    return commands
  }

  DB.init()
  .then(async () => {
    command_data = await GetCommandData(config)
    if (config.use_child_process) {
      data_process = fork('./getdata.js', [], {execArgv: []}) // execArgv is a workaround to not break the VSCode debugger
      data_process.on('error', err => console.log(err.message))
      update_commands(command_data)
    }
    else {
      RunCommands(() => command_data)
    }
  })

  process.on('exit', () => {
    if (data_process) data_process.kill()
  })

  const auth_module = await GetPackage(config.authentication)

  const cert_directory = await FS.promises.access('cert').then(() => 'cert', () => 'default_cert')

  const app = UWS.SSLApp({
    key_file_name: Path.join(cert_directory, 'key'),
    cert_file_name: Path.join(cert_directory, 'cert'),
  })
  app.get('/', require('./http/main'))
  app.get('/*', require('./http/files'))
  app.get('/nodes', require('./http/getnodes'))
  app.get('/commands', (res, req) => require('./http/getcommands')(res, req, command_data))
  app.post('/commands', (res, req) => {
    require('./http/postcommands')(res, req, command_data)
    .then(commands => command_data = update_commands(commands))
  })
  app.get('/actions', (res, req) => require('./http/getactions')(res, req, actions))
  app.post('/actions', (res, req) => require('./http/postactions')(res, req, actions))
  app.post('/action_followup', (res, req) => require('./http/postactionfollowup')(res, req, actions))
  app.get('/results', require('./http/getresults'))
  app.get('/quests', (res, req) => require('./http/getquests')(res, req, tests))
  app.post('/quests', (res, req) => require('./http/postquests')(res, req, tests))
  app.get('/quest_history', require('./http/getquesthistory'))
  app.get('/tests', (res, req) => require('./http/gettests')(res, req, tests))
  app.post('/tests', (res, req) => require('./http/posttests')(res, req, tests))
  app.get('/test_history', require('./http/gettesthistory'))
  app.get('/logout', require('./http/auth/logout'))
  app.get('/user', require('./http/getuser'))
  app.get('/user_history', require('./http/getuserhistory'))
  app.post('/swap_favorites', require('./http/postswapfavorites'))
  app.post('/favorites', require('./http/postfavorites'))
  app.get('/logs', require('./http/getlogs'))

  auth_module.configure(app)

  app.listen(config.port + 1, () => console.log(`Fantastic Server running on port ${config.port + 1}!`))

  HTTPolyglot.createServer({
    key: FS.readFileSync(Path.join(cert_directory, 'key')),
    cert: FS.readFileSync(Path.join(cert_directory, 'cert'))
  }, function(req, res) {
    res.writeHead(301, { 'Location': `https://${req.headers.host.split(':')[0]}:${config.port + 1}` });
    return res.end();
  }).listen(config.port);

  // reload config and update changed data
  WatchConfig(data => {
    config = data.config
    command_data = update_commands(data.command_data)
    // TODO update quest, actions, tests
    console.log('config.json changed, got new data')
  })

}

main()