/**
 * Get data to pass into action commands when the target is a connection
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {number} connection_id 
 */
const getConnectionData = (db, connection_id) => db.get({table: 'connections', columns: ['from_id', 'to_id', 'process_id', 'local_port', 'remote_port'], conditions: {columns: {connection_id}}})
  .then(async res => {
    if (res) return {
      process: await db.get({table: 'processes', columns: ['pid'], conditions: {columns: {process_id: res.process_id}}}).then(res => res && res.pid),
      local_ip: await db.get({table: 'ips', columns: ['ip'], conditions: {columns: {ip_id: res.from_id}}}).then(res => res && res.ip),
      remote_ip: await db.get({table: 'ips', columns: ['ip'], conditions: {columns: {ip_id: res.to_id}}}).then(res => res && res.ip),
      local_port: res.local_port,
      remote_port: res.remote_port
    }
  })

module.exports = getConnectionData