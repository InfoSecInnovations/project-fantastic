const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const DB = require('./db')
const {fork} = require('child_process')

const GetCommandData = require('./commands/getcommanddata')
const RunCommands = require('./commands/runcommands')
const GetActionData = require('./actions/getactiondata')
const GetQuestData = require('./quests/getquestdata')
const GetTestData = require('./tests/gettestdata')
const WatchConfig = require('./watchconfig')
const WriteConfig = require('./writeconfig')

const main = async () => {

  let config = await FS.readFile('config/config.json').then(res => JSON.parse(res))
  let data_process
  
  let command_data = await GetCommandData(config)
  let actions = await GetActionData(config)
  let quests = await GetQuestData(config)
  let tests = await GetTestData(config)

  const update_commands = commands => {
    if (data_process) data_process.send({type: 'commands', commands})
    return commands
  }

  DB.init()
  .then(() => {
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

  const auth_module = require(`./config/node_modules/${config.authentication}`)

  const app = UWS.SSLApp({
    key_file_name: 'cert/key',
    cert_file_name: 'cert/cert'
  })
  app.get('/', require('./http/main'))
  app.get('/*', require('./http/files'))
  app.get('/nodes', require('./http/getnodes'))
  app.get('/commands', (res, req) => require('./http/getcommands')(res, req, command_data))
  app.post('/commands', (res, req) => {
    command_data = update_commands(require('./http/postcommands')(res, req, command_data))
    config.data_sources = Object.entries(command_data).filter(v => v[1]).reduce((result, v) => {
      const split = v[0].split('/')
      if (!result[split[0]]) result[split[0]] = []
      result[split[0]].push(split[1])
      return result
    }, {})
    WriteConfig(config)
  })
  app.get('/actions', (res, req) => require('./http/getactions')(res, req, actions))
  app.post('/actions', (res, req) => require('./http/postactions')(res, req, config))
  app.post('/action_followup', require('./http/postactionfollowup'))
  app.get('/results', require('./http/getresults'))
  app.get('/quests', (res, req) => require('./http/getquests')(res, req, quests))
  app.post('/quests', require('./http/postquests'))
  app.get('/quest_history', require('./http/getquesthistory'))
  app.get('/tests', (res, req) => require('./http/gettests')(res, req, tests))
  app.post('/tests', require('./http/posttests'))
  app.get('/test_history', require('./http/gettesthistory'))
  app.get('/logout', require('./http/auth/logout'))

  auth_module.configure(app)

  app.listen(config.port, () => console.log(`Fantastic Server running on port ${config.port}!`))

  // reload config and update changed data
  WatchConfig(data => {
    config = data.config
    command_data = update_commands(data.command_data)
    // TODO update quest, actions, tests
    console.log('config.json changed, got new data')
  })

}

main()