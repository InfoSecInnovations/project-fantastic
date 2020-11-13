const NodeColumns = require('../nodecolumns')

/**
 * Insert a new node into the database and its corresponding IPs and MACs
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {import('../types').Node} node 
 * @param {number} date 
 */
const insertNode = (db, node, date) => db.insert('nodes', NodeColumns.reduce((result, v) => ({...result, [v]: node[v]}), {date, first_date: date})) // if we didn't find any nodes we just insert a new one
  .then(async res => {
    // add all the IPs and MACs
    if (node.ips) for (const ip of node.ips) await db.insert('ips', {ip, node_id: res, date, first_date: date})
    if (node.macs) for (const mac of node.macs) await db.insert('macs', {mac: mac.mac, vendor: mac.vendor, node_id: res})
    return res
  })

module.exports = insertNode