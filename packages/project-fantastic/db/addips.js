/**
 * Add IPs to the database for a node
 * @param {number} node_id database ID of the node owning the IPs
 * @param {?string[]} ips 
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {number} date 
 */
const addIps = async (node_id, ips, db, date) => {
  if (!ips) return
  const validIPs = ips.filter(ip => ip)
  if (!validIPs.length) return
  return await db.all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {groups: [{columns: {node_id}}, {columns: {ip: validIPs}, compare: 'IN'}]}}) // select IPs we already have
  .then(res => 
    db.update({table: 'ips', row: {date}, conditions: {columns: {ip_id: res.map(v => v.ip_id)}, compare: 'IN'}}) // update the existing ones
    .then(() => db.insert('ips', validIPs.filter(v => !res.find(r => r.ip === v)).map(v => ({ip: v, node_id, date, first_date: date})))) // insert the new ones
  )
}

module.exports = addIps