const UWS = require('uWebSockets.js')
const FS = require('fs').promises
const DB = require('./db')
const {fork} = require('child_process')
const GetCommandData = require('./commands/getcommanddata')
const RunCommands = require('./commands/runcommands')
const GetActionData = require('./actions/getactiondata')
const GetQuestData = require('./quests/getquestdata')
const Files = require('./http/files')
const GetNodes = require('./http/getnodes')
const GetCommands = require('./http/getcommands')
const PostCommands = require('./http/postcommands')
const GetActions = require('./http/getactions')
const PostActions = require('./http/postactions')
const PostActionFollowup = require('./http/postactionfollowup')
const GetQuests = require('./http/getquests')
const PostQuests = require('./http/postquests')
const WatchConfig = require('./watchconfig')
const WriteConfig = require('./writeconfig')
const GetResults = require('./http/getresults')
const GetQuestHistory = require('./http/getquesthistory')

const main = async () => {

  let config = await FS.readFile('config/config.json').then(res => JSON.parse(res))
  let data_process
  
  let command_data = await GetCommandData(config)
  let actions = await GetActionData(config)
  let quests = await GetQuestData(config)

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

  const app = UWS.SSLApp({
    key_file_name: 'cert/key',
    cert_file_name: 'cert/cert'
  })
  app.get('/*', Files)
  app.get('/nodes', GetNodes)
  app.get('/commands', (res, req) => GetCommands(res, req, command_data))
  app.post('/commands', (res, req) => {
    command_data = update_commands(PostCommands(res, req, command_data))
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
  app.get('/quests', (res, req) => GetQuests(res, req, quests))
  app.post('/quests', PostQuests)
  app.get('/quest_history', GetQuestHistory)
  app.listen(config.port, () => console.log(`Fantastic Server running on port ${config.port}!`))

  // reload config and command data if it changed
  WatchConfig(data => {
    config = data.config
    command_data = update_commands(data.command_data)
    console.log('config.json changed, got new data')
  })

}

main()