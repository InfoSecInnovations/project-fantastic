#!/usr/bin/env node

const UWS = require('uWebSockets.js')
const DB = require('./db')
const {fork} = require('child_process')
const GetCommandData = require('./commands/getcommanddata')
const RunCommands = require('./commands/runcommands')
const GetActionData = require('./actions/getactiondata')
const GetScanData = require('./scans/getscandata')
const GetConfig = require('./util/getconfig')
const WatchConfig = require('./watchconfig')
const GetPackage = require('./util/getpackage')
const FS = require('fs').promises
const Path = require('path')
const IsAdmin = require('is-admin')
const Routes = require('./routes')
const CreateRoutingServer = require('./createroutingserver')
const version = require('./version')
const AuthFactory = require('@infosecinnovations/fantastic-auth_factory')
const GetStoryData = require('./stories/getstorydata')
const EventLogger = require('./eventlogger')
const EventCodes = require('./eventcodes')

/**
 * Start the server
 */
const main = async () => {

  const is_admin = await IsAdmin()
  if (!is_admin) {
    EventLogger.error('ADMINISTRATOR ACCESS REQUIRED: Please run as administrator!', EventCodes.ADMINISTRATOR_REQUIRED)
    return console.log('ADMINISTRATOR ACCESS REQUIRED: Please run as administrator!')
  } 
  const current_version = await FS.readFile('.current_version').then(res => parseInt(res)).catch(() => '')
  if (current_version !== version) return console.log("Version mismatch, please run 'npx fantastic-upgrade' to upgrade!")

  let config = await GetConfig()
  let data_process
  let actions = await GetActionData(config)
  let scans = await GetScanData(config)
  let stories = await GetStoryData(config)
  const auth_module = AuthFactory(GetPackage(config.authentication.module))
  const update_commands = commands => {
    if (data_process) data_process.send({type: 'commands', commands})
    return commands
  }
  const cert_directory = 'cert'
  const app = UWS.SSLApp({
    key_file_name: Path.join(cert_directory, 'key'),
    cert_file_name: Path.join(cert_directory, 'cert'),
  })

  await DB.init()
  await auth_module.initializeRoutes(app)
  let command_data = await GetCommandData(config) // command data reads from the database so we have to call it after init
  Routes(
    app,
    auth_module, 
    () => command_data, 
    () => actions, 
    () => scans,
    () => stories,
    commands => command_data = update_commands(commands),
    () => config
  )
  if (config.use_child_process) {
    data_process = fork(Path.join(__dirname, './getdata.js'), [], {execArgv: []}) // execArgv is a workaround to not break the VSCode debugger
    data_process.on('error', err => console.log(err.message))
    update_commands(command_data)
  }
  else {
    RunCommands(() => command_data)
  }
  process.on('exit', () => {
    if (data_process) data_process.kill()
  })
  app.listen(config.port + 1, () => {
    console.log(`Fantastic Server running on port ${config.port + 1}!`)
    EventLogger.info(`Fantastic Server running on port ${config.port + 1}`, EventCodes.SERVER_START)
  })
  CreateRoutingServer(config.port, cert_directory)

  // reload config and update changed data
  WatchConfig(data => {
    config = data.config
    command_data = update_commands(data.command_data)
    // TODO update quest, actions, scans
    console.log('config.json changed, got new data')
  })

}

main()