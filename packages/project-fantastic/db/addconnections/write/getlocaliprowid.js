/**
 * Get ID of local IP in database, adding/updating the entry if required
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db write transation
 * @param {number} node_id database ID for local host
 * @param {number} date
 * @param {string} ip local IP
 * @param {{} | undefined} local_ip_row existing data for local IP
 * @returns {Promise<number>}
 */
const getLocalIpRowID = async (db, node_id, date, ip, local_ip_row) => {
  if (local_ip_row) { // if we already have a row for the local IP, we need to update the date
    await db.update({table: 'ips', row: {date}, conditions: {columns: {ip_id: local_ip_row.ip_id}}})
    return local_ip_row.ip_id
  }
  else return await db.insert('ips', {ip, date, first_date: date, node_id})
}

module.exports = getLocalIpRowID