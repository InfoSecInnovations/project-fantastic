const {update, insert, remove, all} = require('./operations')

const addNodes = async nodes => {
  const date = Date.now()
  for (const n of nodes) {
    // TODO: deal with nodes from multiple hosts some of which may have the same IPs!
    await (n.ips && n.ips.length ? all({table: 'ips', columns: ['node_id'], conditions: {columns: {ip: n.ips}, compare: 'IN'}}) : Promise.resolve([]))
    .then(res => all({table: 'nodes', conditions: {groups: [{columns: {mac: n.mac}}, {columns: {node_id: res.map(v => v.node_id)}, compare: 'IN'}], combine: 'OR'}})) // find nodes with the same address as this one
    .then(res => {
      const columns = ['mac', 'hostname', 'vendor']
      if (!res.length) {
        return insert('nodes', columns.reduce((result, v) => ({...result, [v]: n[v]}), {date})) // if we didn't find any nodes we just insert a new one
        .then(res => Promise.all(n.ips.map(v => insert('ips', {ip: v, node_id: res, date})))) // and add all the IPs
      }
      if (res.length == 1) return update({table: 'nodes', row: columns.reduce((result, v) => ({...result, [v]: n[v]}), {date}), conditions:{ columns: {node_id: res[0].node_id}}}) // if there's just one node we update it
      .then(() => all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {columns: {ip: n.ips}, compare: 'IN'}})) // select IPs we already have
      .then(res => 
        update({table: 'ips', row: {date}, conditions: {columns: {ip_id: res.map(v => v.ip_id)}, compare: 'IN'}}) // update the existing ones
        .then(() => Promise.all(n.ips.filter(v => !res.find(r => r.ip === v)).map(v => insert('ips', {ip: v, node_id: res[0].node_id, date})))) // insert the new ones
      ) 
      // if we found multiple nodes that match, we have to merge all the information
      return update({table: 'ips', row: {node_id: res[0].node_id, date}, conditions: {columns: {node_id: res.slice(1).map(v => v.node_id)}, compare: 'IN'}}) // update IP table to point at first node
      .then(() => remove({table: 'nodes', conditions: {columns: {node_id: res.slice(1).map(v => v.node_id)}, compare: 'IN'}})) // remove the other nodes
      .then(() => update({table: 'nodes', row: columns.reduce((result, v) => { // merge information from the removed ones
        if (n[v]) result[v] = n[v]
        else {
          const f = res.find(f => f[v])
          if (f) result[v] = f[v]
        }
        return result
      }, {date}), conditions:{ columns: {node_id: res[0].node_id}}}))
    })
    .catch(rej => console.log(rej.message))
  }
}

module.exports = addNodes