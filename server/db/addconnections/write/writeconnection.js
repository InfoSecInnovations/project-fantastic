/**
 * Write the connection data to the database
 * @param {import('fantastic-utils/db/types').Operations} db 
 * @param {import('../../types').Connection} connection 
 * @param {number} date 
 * @param {{} | undefined} existing existing data matching this connection if we have it
 * @param {number} process_id database ID of the process owning the connection
 * @param {number} local_ip_id database ID of the local IP
 * @param {number} remote_ip_id database ID of the remote IP
 */
const writeConnection = async (db, connection, date, existing, process_id, local_ip_id, remote_ip_id) => {
  if (existing) await db.update({ // if we already found an identical connection, we just need to update it
    table: 'connections', 
    row: {state: connection.state, process_id, date}, 
    conditions: {columns: {connection_id: existing.connection_id}}
  })
  else await db.insert('connections', { // if not, insert
    from_id: local_ip_id, 
    to_id: remote_ip_id, 
    process_id, 
    local_port: connection.local_port, 
    remote_port: connection.remote_port, 
    state: connection.state, 
    date,
    first_date: date
  })
}

module.exports = writeConnection