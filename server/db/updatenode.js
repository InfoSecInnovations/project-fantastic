const FilterColumns = require('./filtercolumns')
const AddMACs = require('./addmacs')
const AddIPs = require('./addips')

const updateNode = async (node_id, data, db, overwrite) => {
  if (!data) return

  console.log(`updating node ${node_id} with fresh data...`)

  const date = Date.now()
  await (overwrite ? Promise.resolve() : db.get({table: 'nodes', conditions: {columns: {node_id}}}))
    .then(res => db.update({
      table: 'nodes', 
      row: FilterColumns(res, overwrite).reduce((result, v) => ({...result, [v]: data[v]}), {date}), 
      conditions: {columns: {node_id}}}))
    .then(() => AddIPs(node_id, data.ips, db, date))
    .then(() => AddMACs(node_id, data.macs, db, overwrite)) 
    .catch(rej => console.log(`updateNode failed: ${rej.message}`))

  console.log(`updated node ${node_id} in ${Date.now() - date}ms.`)
}

module.exports = updateNode