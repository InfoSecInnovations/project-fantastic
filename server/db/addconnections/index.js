const {update} = require('../operations')
const Read = require('./read')
const Write = require('./write')

/**
 * Add connections to the database or update if we already have them
 * @param {number} node_id ID of the host in the database
 * @param {import('../types').Connection[]} connections 
 * @param {boolean} is_remote Is this host the server or a different host?
 */
const addConnections = async (node_id, connections, is_remote) => {
  console.log(`adding ${connections.length} connections from node ${node_id} to database...`)
  const date = Date.now()
  const processes = {} // track process names we already found to avoid calling the PowerShell script unnecessarily
  let new_nodes = 0
  await update({table: 'nodes', row: {date}, conditions: {columns: {node_id}}}) // keep the node up to date
  // we do reading and writing in 2 different transactions to block the database as little as possible
  for (const c of connections) {
    new_nodes += await Write(node_id, c, date, await Read(node_id, c, is_remote, processes))
  }
  console.log(`added ${connections.length} connections to database from node ${node_id} in ${Date.now() - date}ms. ${new_nodes} new nodes were found.`)
}

module.exports = addConnections