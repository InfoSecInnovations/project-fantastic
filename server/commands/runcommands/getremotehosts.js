const DB = require('../../db')
const RunPowerShell = require('fantastic-cli/runpowershell')

/**
 * Find hosts on our network we can remotely access using PowerShell
 * @param {number} local database ID of the host the server is running on 
 */
const getRemoteHosts = async local => {
  console.log('finished searching for hosts, finding hosts with remote access enabled...')
  const remote = []
  const nodes = await DB.all({table: 'nodes', conditions: {columns: {important: true}}}) // "important" nodes are ones belonging to our network
  for (const node of nodes) {
    if (node.node_id === local) continue // we only want remote nodes here
    const hostname = node.hostname
    if (!hostname) continue
    const res = await RunPowerShell(`Test-WsMan ${hostname}`, undefined, false) // if Test-WsMan doesn't error it means we can run remote commands on this host             
    if (res) {
      remote.push({ id: node.node_id, hostname })
      await DB.updateNode(node.node_id, { access: 'remote' }, DB, true)
    }
  }
  console.log(`found ${remote.length} hosts with remote access enabled.`)
  return remote
}

module.exports = getRemoteHosts