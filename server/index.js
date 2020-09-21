const UWS = require('uWebSockets.js')
const DB = require('./db')
const {fork} = require('child_process')
const GetCommandData = require('./commands/getcommanddata')
const RunCommands = require('./commands/runcommands')
const GetActionData = require('./actions/getactiondata')
const GetTestData = require('./tests/gettestdata')
const GetConfig = require('./util/getconfig')
const WatchConfig = require('./watchconfig')
const GetPackage = require('./util/getpackage')
const FS = require('fs')
const Path = require('path')
const IsAdmin = require('is-admin')
const Routes = require('./routes')
const CreateRoutingServer = require('./createroutingserver')

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

  await DB.init()
  command_data = await GetCommandData(config)
  if (config.use_child_process) {
    data_process = fork('./getdata.js', [], {execArgv: []}) // execArgv is a workaround to not break the VSCode debugger
    data_process.on('error', err => console.log(err.message))
    update_commands(command_data)
  }
  else {
    RunCommands(() => command_data)
  }
  process.on('exit', () => {
    if (data_process) data_process.kill()
  })

  const cert_directory = await FS.promises.access('cert').then(() => 'cert', () => 'default_cert')
  const app = UWS.SSLApp({
    key_file_name: Path.join(cert_directory, 'key'),
    cert_file_name: Path.join(cert_directory, 'cert'),
  })
  Routes(app, () => command_data, () => actions, () => tests, commands => command_data = update_commands(commands))
  await GetPackage(config.authentication).then(res => res.configure(app))
  app.listen(config.port + 1, () => console.log(`Fantastic Server running on port ${config.port + 1}!`))
  CreateRoutingServer(config, cert_directory)

  // reload config and update changed data
  WatchConfig(data => {
    config = data.config
    command_data = update_commands(data.command_data)
    // TODO update quest, actions, tests
    console.log('config.json changed, got new data')
  })

}

main()