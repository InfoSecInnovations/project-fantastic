/**
 * Get the database ID for the remote IP, adding/updating entries for the IP and remote host if required.
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db write transaction
 * @param {number} node_id database ID of local host
 * @param {number} date 
 * @param {string} ip remote IP address
 * @param {{} | undefined} remote_ip_row existing data for the remote IP
 */
const getRemoteRowID = async (db, node_id, date, ip, remote_ip_row) => {
  if (remote_ip_row) { // if we already have a row for the remote IP, we need to update the date
    await db.update({table: 'ips', row: {date}, conditions: {columns: {ip_id: remote_ip_row.ip_id}}})
    if (remote_ip_row.node_id !== node_id) await db.update({table: 'nodes', row: {date}, conditions: {columns: {node_id: remote_ip_row.node_id}}}) // also keep the node which owns the IP updated
    return {id: remote_ip_row.ip_id, new_nodes: 0}
  }
  else return { // if not we have to insert a new node and then an IP belonging to this node
      id: await db.insert('nodes', {date, first_date: date})
      .then(res => db.insert('ips', {ip, date, first_date: date, node_id: res})),
      new_nodes: 1
    }
  }

module.exports = getRemoteRowID