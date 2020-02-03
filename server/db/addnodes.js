const {update, insert, remove, all, get} = require('./operations')

const addNodes = async nodes => {

  console.log(`adding ${nodes.length} nodes to the database...`)

  const date = Date.now()
  const ids = []
  for (const n of nodes) {
    // TODO: this is going to find IPs such as 127.0.0.1 from all nodes, we need to narrow it down somehow
    await (n.ips && n.ips.length ? all({table: 'ips', columns: ['node_id'], conditions: {columns: {ip: n.ips}, compare: 'IN'}}) : Promise.resolve([]))
    .then(res => all({table: 'nodes', conditions: {groups: [{columns: {mac: n.mac}}, {columns: {node_id: res.map(v => v.node_id)}, compare: 'IN'}], combine: 'OR'}})) // find nodes with the same address as this one
    .then(res => {
      const columns = ['mac', 'hostname', 'vendor', 'os', 'important']
      if (!res.length) {
        return insert('nodes', columns.reduce((result, v) => ({...result, [v]: n[v]}), {date})) // if we didn't find any nodes we just insert a new one
        .then(res => {
          ids.push(res)
          return Promise.all(n.ips.map(v => insert('ips', {ip: v, node_id: res, date})))
        }) // and add all the IPs
      }
      if (res.length == 1) return update({table: 'nodes', row: columns.reduce((result, v) => ({...result, [v]: n[v]}), {date}), conditions:{ columns: {node_id: res[0].node_id}}}) // if there's just one node we update it
      .then(() => all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {groups: [{columns: {node_id: res[0].node_id}}, {columns: {ip: n.ips}, compare: 'IN'}]}})) // select IPs we already have
      .then(ips => {
        ids.push(res[0].node_id)
        return update({table: 'ips', row: {date}, conditions: {columns: {ip_id: ips.map(v => v.ip_id)}, compare: 'IN'}}) // update the existing ones
        .then(() => Promise.all(n.ips.filter(v => !ips.find(r => r.ip === v)).map(v => insert('ips', {ip: v, node_id: res[0].node_id, date})))) // insert the new ones
      }) 
      // if we found multiple nodes that match, we have to merge all the information
      ids.push(res[0].node_id)
      return update({table: 'ips', row: {node_id: res[0].node_id, date}, conditions: {columns: {node_id: res.slice(1).map(v => v.node_id)}, compare: 'IN'}}) // update IP table to point at first node
      .then(() => all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {groups: [{columns: {node_id: res[0].node_id}}, {columns: {ip: n.ips}, compare: 'IN'}]}})) // select IPs we already have
      .then(ips => Promise.all(n.ips.filter(v => !ips.find(r => r.ip === v)).map(v => insert('ips', {ip: v, node_id: res[0].node_id, date})))) // insert the new IPs
      .then(() => remove({table: 'nodes', conditions: {columns: {node_id: res.slice(1).map(v => v.node_id)}, compare: 'IN'}})) // remove the other nodes
      .then(() => update({table: 'nodes', row: columns.reduce((result, v) => { // merge information from the removed ones
        if (n[v] || typeof n[v] === 'boolean' || typeof n[v] === 'number') result[v] = n[v] // we want to update numbers and booleans even if they're falsy
        else {
          const f = res.find(f => f[v] || typeof n[v] === 'number')
          if (f) result[v] = f[v]
        }
        return result
      }, {date}), conditions:{ columns: {node_id: res[0].node_id}}}))
    })
    .catch(rej => console.log(`addNodes failed: ${rej.message}`))
  }

  console.log(`added ${nodes.length} nodes to the database.`)

  return ids
}

module.exports = addNodes