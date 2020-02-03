const {update, insert, all} = require('./operations')

const updateNode = async (node_id, data) => {

  console.log(`updating node ${node_id} with fresh data...`)

  const date = Date.now()
  const columns = ['mac', 'hostname', 'vendor', 'os', 'important']

  await update({table: 'nodes', row: columns.reduce((result, v) => ({...result, [v]: data[v]}), {date}), conditions:{columns: {node_id}}})
    .then(() => all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {groups: [{columns: {node_id}}, {columns: {ip: data.ips}, compare: 'IN'}]}})) // select IPs we already have
    .then(res => 
      update({table: 'ips', row: {date}, conditions: {columns: {ip_id: res.map(v => v.ip_id)}, compare: 'IN'}}) // update the existing ones
      .then(() => Promise.all(data.ips.filter(v => !res.find(r => r.ip === v)).map(v => insert('ips', {ip: v, node_id, date})))) // insert the new ones
    ) 
    .catch(rej => console.log(`updateNode failed: ${rej.message}`))

  console.log(`updated node ${node_id}.`)
}

module.exports = updateNode