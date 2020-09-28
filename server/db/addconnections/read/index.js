const {transaction, OPEN_READONLY} = require('../../operations')
const GetProcess = require('./getprocess')

/**
 * Read the information required to handle adding connection data
 * @param {number} node_id ID of the host in the database
 * @param {import('../../types').Connection} connection
 * @param {boolean} is_remote Is this host the server or a different host?
 * @param {Object.<string, string>} processes bookeeping for process names
 */
const read = async (node_id, connection, is_remote, processes) => {
  const db = await transaction(OPEN_READONLY)
  const hostname = is_remote ? await db.get({table: 'nodes', columns: ['hostname'], conditions: {columns: {node_id}}}).then(res => res.hostname) : ''
  const process_name = processes[connection.process] || await GetProcess(connection.process, hostname)
  processes[connection.process] = process_name
  const process = await db.get({table: 'processes', columns: ['process_id'], conditions: {columns: {pid: connection.process, node_id}}}) // find the process in the relevant table
  const local_ip_row = await db.get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip: connection.local_address, node_id}}})
  const remote_ip_row = await db.get({table: 'ips', columns: ['ip_id', 'node_id'], conditions: {columns: {ip: connection.remote_address, node_id}}}) || // first we have to find if a row already exists with the IP on the same node (if so this is an internal connection)
  await db.get({table: 'ips', columns: ['ip_id', 'node_id'], conditions: {columns: {ip: connection.remote_address}}, order_by: {date: 'DESC'}}) // if not check if the IP corresponds to another node, it's likely that in the case of more than one result the most recent is the correct one
  const existing = local_ip_row && remote_ip_row && await db.get({table: 'connections', columns: ['connection_id'], conditions: {columns: { // check if we already have a connection identical to this one
    from_id: local_ip_row.ip_id, 
    to_id: remote_ip_row.ip_id, 
    local_port: connection.local_port, 
    remote_port: connection.remote_port
  }}})
  db.close()
  return { process_name, process, local_ip_row, remote_ip_row, existing }
}

module.exports = read