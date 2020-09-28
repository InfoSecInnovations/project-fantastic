const FilterColumns = require('../filtercolumns')
const AddMACs = require('../addmacs')
const AddIPs = require('../addips')

const merge_func = (node, matches) => (result, column) => {
  if (node[column] || typeof node[column] === 'boolean' || typeof node[column] === 'number') result[column] = node[column] // we want to update numbers and booleans even if they're falsy
  else {
    const f = matches.find(f => f[column] || typeof node[column] === 'number')
    if (f) result[column] = f[column]
  }
  return result
}

/**
 * merge all data matching the node we're adding
 * @param {import('fantastic-utils/db/types').Operations} db 
 * @param {import('../types').Node} node 
 * @param {{}[]} matches database rows matching the node
 * @param {boolean} overwrite 
 * @param {number[]} ids bookeeping for node IDs
 */
const mergeNodes = async (db, node, matches, overwrite, ids) => {
  ids.push(matches[0].node_id)
  const first_date = Math.min.apply(Math, matches.map(v => v.first_date)) // find the earliest first date
  await db.update({table: 'ips', row: {node_id: matches[0].node_id, date}, conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}}) // update IP table to point at first node
  await AddIPs(matches[0].node_id, node.ips, db, date)
  await db.update({table: 'macs', row: {node_id: matches[0].node_id}, conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}}) // update MAC table to point at first node
  await AddMACs(matches[0].node_id, node.macs, db, overwrite)
  await db.remove({table: 'nodes', conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}}) // remove the other nodes
  await db.update({
    table: 'nodes', 
    row: FilterColumns(matches[0], overwrite).reduce(merge_func(node, matches), {date, first_date}), // merge information from the removed ones
    conditions:{ columns: {node_id: matches[0].node_id}}
  })
}

module.exports = mergeNodes