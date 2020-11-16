const DefaultIPs = require('@infosecinnovations/fantastic-utils/defaultips')

/**
 * Find nodes matching the one we're trying to add
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {import('../types').Node} node 
 */
const matchingNodes = async (db, node) => {
  const mac_match = await (node.macs && node.macs.length && db.get({table: 'macs', columns:['node_id'], conditions: {columns: {mac: node.macs.map(v => v.mac)}, compare: 'IN'}}) // if we have a node with the same MAC Address we don't need to look any further
    .then(res => res ? db.get({table: 'nodes', conditions: {columns: {node_id: res.node_id}}}) : null))
  if (mac_match) return [mac_match]
  return await (node.ips && node.ips.length ? 
    db.all({table: 'ips', columns: ['node_id'], conditions: {columns: {ip: node.ips.filter(v => !DefaultIPs.includes(v))}, compare: 'IN'}, order_by: {date: 'DESC'}})
    .then(res => db.all({table: 'nodes', conditions: {columns: {node_id: res.map(v => v.node_id)}, compare: 'IN'}})) : Promise.resolve([])) // if we can't find the MAC Address, find nodes with the same IP address as this one 
}

module.exports = matchingNodes