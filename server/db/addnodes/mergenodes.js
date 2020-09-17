const FilterColumns = require('../filtercolumns')
const AddMACs = require('../addmacs')
const AddIPs = require('../addips')

/**
 * merge all data matching the node we're adding
 * @param {import('fantastic-utils/db/operations').Operations} db 
 * @param {import('./index').Node} node 
 * @param {{}[]} matches database rows matching the node
 * @param {boolean} overwrite 
 * @param {number[]} ids bookeeping for node IDs
 */
const mergeNodes = async (db, node, matches, overwrite, ids) => {
  ids.push(matches[0].node_id)
  const first_date = Math.min.apply(Math, matches.map(v => v.first_date)) // find the earliest first date
  await db.update({table: 'ips', row: {node_id: matches[0].node_id, date}, conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}}) // update IP table to point at first node
  .then(() => AddIPs(matches[0].node_id, node.ips, db, date))
  .then(() => db.update({table: 'macs', row: {node_id: matches[0].node_id}, conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}})) // update MAC table to point at first node
  .then(() => AddMACs(matches[0].node_id, node.macs, db, overwrite))
  .then(() => db.remove({table: 'nodes', conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}})) // remove the other nodes
  .then(() => db.update({
    table: 'nodes', 
    row: FilterColumns(matches[0], overwrite).reduce((result, v) => { // merge information from the removed ones
        if (node[v] || typeof node[v] === 'boolean' || typeof node[v] === 'number') result[v] = node[v] // we want to update numbers and booleans even if they're falsy
        else {
          const f = matches.find(f => f[v] || typeof node[v] === 'number')
          if (f) result[v] = f[v]
        }
        return result
      }, {date, first_date}), 
    conditions:{ columns: {node_id: matches[0].node_id}}
  }))
}

module.exports = mergeNodes