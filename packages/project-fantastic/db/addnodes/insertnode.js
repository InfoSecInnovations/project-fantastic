const NodeColumns = require('../nodecolumns')

/**
 * Insert a new node into the database and its corresponding IPs and MACs
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {import('../types').Node} node 
 * @param {number} date 
 */
const insertNode = (db, node, date) => db.insert('nodes', NodeColumns.reduce((result, v) => ({...result, [v]: node[v]}), {date, first_date: date}))
  .then(async res => {
    // add all the IPs and MACs
    if (node.ips) for (const ip of node.ips.filter(ip => ip)) await db.insert('ips', {ip, node_id: res, date, first_date: date}) // don't want null IPs
    if (node.macs) for (const mac of node.macs) await db.insert('macs', {mac: mac.mac, vendor: mac.vendor, node_id: res})
    return res
  })

module.exports = insertNode