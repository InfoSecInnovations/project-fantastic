const {update, insert, all, get} = require('./operations')
const FilterColumns = require('./filtercolumns')
const AddMACs = require('./addmacs')

const updateNode = async (node_id, data, overwrite) => {
  if (!data) return

  console.log(`updating node ${node_id} with fresh data...`)

  const date = Date.now()
  await (overwrite ? Promise.resolve() : get({table: 'nodes', conditions: {columns: {node_id}}}))
    .then(res => update({
      table: 'nodes', 
      row: FilterColumns(res, overwrite).reduce((result, v) => ({...result, [v]: data[v]}), {date}), 
      conditions: {columns: {node_id}}}))
    .then(() => {
      if (data.ips) return all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {groups: [{columns: {node_id}}, {columns: {ip: data.ips}, compare: 'IN'}]}}) // select IPs we already have
      .then(res => 
        update({table: 'ips', row: {date}, conditions: {columns: {ip_id: res.map(v => v.ip_id)}, compare: 'IN'}}) // update the existing ones
        .then(() => Promise.all(data.ips.filter(v => !res.find(r => r.ip === v)).map(v => insert('ips', {ip: v, node_id, date})))) // insert the new ones
      )
    })
    .then(() => AddMACs(node_id, data.macs, overwrite)) 
    .catch(rej => console.log(`updateNode failed: ${rej.message}`))

  console.log(`updated node ${node_id} in ${Date.now() - date}ms.`)
}

module.exports = updateNode