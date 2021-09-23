const GetNode = require('./getnode')
const RunType = require('./runtype')
const CreateCommands = require('./createcommands')
const GetRemoteHosts = require('./getremotehosts')
const DB = require('../../db')
const FindHosts = require('./findhosts')
const EventLogger = require('../../eventlogger')
const EventCodes = require('../../eventcodes')

/**
 * continuously run commands to gather data about hosts
 * @param {() => (Object.<string, import('../types').CommandType>)} get_commands function which returns the commands and their status
 */
const runCommands = async get_commands => {
  const commands = await CreateCommands(get_commands())
  if (!commands) { // when we're running in a child process the command data sometimes takes a tick or so to get transferred over
    console.log('no host data commands found, retrying in 1s!')
    return setTimeout(() => runCommands(get_commands), 1000)
  }
  console.log('-----gathering initial local host data...-----')
  const local = (await GetNode(commands).then(res => DB.addNodes([{...res, access: 'local'}], true)))[0] // create/update the initial node belonging to the local host and get its database ID
  EventLogger.info('gathered initial local host data', EventCodes.GATHER_HOST_DATA)
  const loop = async () => {
    console.log('-----starting host data loop...-----')
    const commands = await CreateCommands(get_commands())
    await FindHosts(commands, local)
    await GetNode(commands).then(res => DB.updateNode(local, res, DB, true))
    await RunType(commands, 'connections', 'local').then(res => DB.addConnections(local, res))
    const remote = await GetRemoteHosts(local)
    for (const node of remote) {
      await RunType(commands, 'connections', 'remote', node.hostname).then(res => DB.addConnections(node.id, res, true))
      await GetNode(commands, node.hostname).then(res => DB.updateNode(node.id, res, DB, true))
    }
    EventLogger.info('gathered data about all known hosts on network', EventCodes.GATHER_HOST_DATA)
    loop ()
  }
  loop()
}

module.exports = runCommands