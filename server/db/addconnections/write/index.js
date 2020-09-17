const {transaction} = require('../../operations')
const GetProcessDatabaseID = require('./getprocessdbid')
const GetLocalIPRowID = require('./getlocaliprowid')
const GetRemoteRowID = require('./getremoterowid')
const WriteConnection = require('./writeconnection')

/**
 * Write connection data to database
 * @param {number} node_id ID of the host in the database
 * @param {import('../index').Connection} connection
 * @param {number} date
 * @param {{
 * process?: {},
 * process_name?: string,
 * local_ip_row?: {},
 * remote_ip_row?: {},
 * existing?: {}
 * }} read_data data from the previous read operations
 */
const write = async (node_id, connection, date, read_data) => {
  const db = await transaction()
  const process_id = await GetProcessDatabaseID(db, node_id, connection.process, read_data.process, read_data.process_name)
  const local_ip_id = await GetLocalIPRowID(db, node_id, date, connection.local_address, read_data.local_ip_row)
  const {id: remote_ip_id, new_nodes} = await GetRemoteRowID(db, node_id, date, connection.remote_address, read_data.remote_ip_row)
  await WriteConnection(db, connection, date, read_data.existing, process_id, local_ip_id, remote_ip_id)
  await db.close()
  return new_nodes
}

module.exports = write