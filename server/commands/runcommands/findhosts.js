const DB = require('../../db')
const RunType = require('./runtype')

/**
 * Run commands to find hosts on the network and add them to the database
 * @param {Object.<string, import('./index').Command[]>} commands
 * @param {number} local database ID of host the server is running on
 */
const findHosts = async (commands, local) => {
  console.log('finding hosts on network...')
  const hosts = await RunType(commands, 'hosts', 'local')
  const local_hosts = []
  const remote_hosts = []
  for (const host of hosts) {
    if (host.local) local_hosts.push(host)
    else remote_hosts.push(host)
  }
  for (const host of local_hosts) {
    await DB.updateNode(local, host, DB)
  }
  await DB.addNodes(remote_hosts)
}

module.exports = findHosts