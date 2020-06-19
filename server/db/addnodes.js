const {transaction} = require('./operations')
const NodeColumns = require('./nodecolumns')
const FilterColumns = require('./filtercolumns')
const AddMACs = require('./addmacs')
const AddIPs = require('./addips')
const UpdateNode = require('./updatenode')
const DefaultIPs = require('fantastic-utils/defaultips')

const addNodes = async (nodes, overwrite) => {
  console.log(`adding ${nodes.length} nodes to the database...`)
  const date = Date.now()
  const db = await transaction()
  const ids = []
  let new_nodes = 0
  for (const n of nodes) {
    try {
      let matches
      const mac_match = await (n.macs && n.macs.length && db.get({table: 'macs', columns:['node_id'], conditions: {columns: {mac: n.macs.map(v => v.mac)}, compare: 'IN'}}) // if we have a node with the same MAC Address we don't need to look any further
        .then(res => res ? db.get({table: 'nodes', conditions: {columns: {node_id: res.node_id}}}) : null))
      if (mac_match) matches = [mac_match]
      else matches = await (n.ips && n.ips.length ? 
        db.all({table: 'ips', columns: ['node_id'], conditions: {columns: {ip: n.ips.filter(v => !DefaultIPs.includes(v))}, compare: 'IN'}, order_by: {date: 'DESC'}})
        .then(res => db.all({table: 'nodes', conditions: {columns: {node_id: res.map(v => v.node_id)}, compare: 'IN'}})) : Promise.resolve([])) // if we can't find the MAC Address, find nodes with the same IP address as this one 
      if (!matches.length) await db.insert('nodes', NodeColumns.reduce((result, v) => ({...result, [v]: n[v]}), {date})) // if we didn't find any nodes we just insert a new one
        .then(async res => {
          ids.push(res)
          new_nodes ++
          // and add all the IPs and MACs
          if (n.ips) for (const ip of n.ips) await db.insert('ips', {ip, node_id: res, date})
          if (n.macs) for (const mac of n.macs) await db.insert('macs', {mac: mac.mac, vendor: mac.vendor, node_id: res})
        })
      else if (matches.length == 1) await UpdateNode(matches[0].node_id, n, db, overwrite) // if we just found one node we can update it
        .then(() => ids.push(matches[0].node_id))
      else { // if we found multiple nodes that match, we have to merge all the information   
        ids.push(matches[0].node_id)
        await db.update({table: 'ips', row: {node_id: matches[0].node_id, date}, conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}}) // update IP table to point at first node
        .then(() => AddIPs(matches[0].node_id, n.ips, db, date))
        .then(() => db.update({table: 'macs', row: {node_id: matches[0].node_id}, conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}})) // update MAC table to point at first node
        .then(() => AddMACs(matches[0].node_id, n.macs, db, overwrite))
        .then(() => db.remove({table: 'nodes', conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}})) // remove the other nodes
        .then(() => db.update({
          table: 'nodes', 
          row: FilterColumns(matches[0], overwrite).reduce((result, v) => { // merge information from the removed ones
              if (n[v] || typeof n[v] === 'boolean' || typeof n[v] === 'number') result[v] = n[v] // we want to update numbers and booleans even if they're falsy
              else {
                const f = matches.find(f => f[v] || typeof n[v] === 'number')
                if (f) result[v] = f[v]
              }
              return result
            }, {date}), 
          conditions:{ columns: {node_id: matches[0].node_id}}
        }))
      }
    }
    catch(e) {
      console.log(`addNodes failed: ${e.message}`)
    }
  }
  await db.close()
  console.log(`added data for ${nodes.length} nodes to the database in ${Date.now() - date}ms of which ${new_nodes} were new.`)
  return ids
}

module.exports = addNodes