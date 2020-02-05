const {update, insert, remove, all, get} = require('./operations')

const addNodes = async nodes => {
  console.log(`adding ${nodes.length} nodes to the database...`)
  const date = Date.now()
  const ids = []
  let new_nodes = 0
  for (const n of nodes) {
    try {
      let matches
      const mac_match = await get({table: 'macs', columns:['node_id'], conditions: {columns: {mac: n.macs.map(v => v.mac)}, compare: 'IN'}}) // if we have a node with the same MAC Address we don't need to look any further
        .then(res => res ? get({table: 'nodes', conditions: {columns: {node_id: res.node_id}}}) : null)
      if (mac_match) matches = [mac_match]
      else matches = await (n.ips && n.ips.length ? all({table: 'ips', columns: ['node_id'], conditions: {columns: {ip: n.ips}, compare: 'IN'}, order_by: {date: 'DESC'}}) : Promise.resolve([])) // if we can't find the MAC Address, find nodes with the same IP address as this one
        .then(res => all({table: 'nodes', conditions: {columns: {node_id: res.map(v => v.node_id)}, compare: 'IN'}})) 
      const columns = ['hostname', 'os', 'important']
      if (!matches.length) await insert('nodes', columns.reduce((result, v) => ({...result, [v]: n[v]}), {date})) // if we didn't find any nodes we just insert a new one
        .then(res => {
          ids.push(res)
          new_nodes ++
          return Promise.all([
            ...n.ips.map(v => insert('ips', {ip: v, node_id: res, date})),
            ...n.macs.map(v => insert('macs', {mac: v.mac, vendor: v.vendor, node_id: res}))
          ])
        }) // and add all the IPs and MACs
      else if (matches.length == 1) await update({table: 'nodes', row: columns.reduce((result, v) => ({...result, [v]: n[v]}), {date}), conditions:{ columns: {node_id: matches[0].node_id}}}) // if there's just one node we update it
        .then(() => all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {groups: [{columns: {node_id: matches[0].node_id}}, {columns: {ip: n.ips}, compare: 'IN'}]}})) // select IPs we already have
        .then(res => update({table: 'ips', row: {date}, conditions: {columns: {ip_id: res.map(v => v.ip_id)}, compare: 'IN'}}) // update the existing ones
          .then(() => Promise.all(n.ips.filter(v => !res.find(r => r.ip === v)).map(v => insert('ips', {ip: v, node_id: matches[0].node_id, date})))) // insert the new ones
        )
        .then(() => all({table: 'macs', columns: ['mac', 'mac_id'], conditions: {columns: {mac: n.macs.map(v => v.mac)}, compare: 'IN'}})) // select MACs we already have
        .then(res => {
          ids.push(matches[0].node_id)
          return Promise.all([
            ...res.map(v => update({table: 'macs', row: {vendor: n.macs.find(m => m.mac === v.mac).vendor}, conditions: {columns: {mac_id: v.mac_id}}})), // update the existing ones
            ...n.macs.filter(v => !res.find(r => r.mac === v.mac)).map(v => insert('macs', {mac: v.mac, vendor: v.vendor, node_id: matches[0].node_id})) // insert the new ones
          ])
        })
      else { // if we found multiple nodes that match, we have to merge all the information   
        ids.push(matches[0].node_id)
        await update({table: 'ips', row: {node_id: matches[0].node_id, date}, conditions: {columns: {node_id: matches.map(v => v.node_id)}, compare: 'IN'}}) // update IP table to point at first node
        .then(() => all({table: 'ips', columns: ['ip', 'ip_id'], conditions: {groups: [{columns: {node_id: matches[0].node_id}}, {columns: {ip: n.ips}, compare: 'IN'}]}})) // select IPs we already have
        .then(res => Promise.all(n.ips.filter(v => !res.find(r => r.ip === v)).map(v => insert('ips', {ip: v, node_id: matches[0].node_id, date})))) // insert the new IPs
        .then(() => update({table: 'macs', row: {node_id: matches[0].node_id}, conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}})) // update MAC table to point at first node
        .then(() => all({table: 'macs', columns: ['mac', 'mac_id'], conditions: {columns: {mac: n.macs.map(v => v.mac)}, compare: 'IN'}})) // select MACs we already have
        .then(res => 
          Promise.all([
            ...res.map(v => update({table: 'macs', row: {vendor: n.macs.find(m => m.mac === v.mac).vendor}, conditions: {columns: {mac_id: v.mac_id}}})), // update the existing MACs
            ...n.macs.filter(v => !res.find(r => r.mac === v.mac)).map(v => insert('macs', {mac: v.mac, vendor: v.vendor, node_id: matches[0].node_id})) // insert the new ones
          ])
        )
        .then(() => remove({table: 'nodes', conditions: {columns: {node_id: matches.slice(1).map(v => v.node_id)}, compare: 'IN'}})) // remove the other nodes
        .then(() => update({table: 'nodes', row: columns.reduce((result, v) => { // merge information from the removed ones
          if (n[v] || typeof n[v] === 'boolean' || typeof n[v] === 'number') result[v] = n[v] // we want to update numbers and booleans even if they're falsy
          else {
            const f = matches.find(f => f[v] || typeof n[v] === 'number')
            if (f) result[v] = f[v]
          }
          return result
        }, {date}), conditions:{ columns: {node_id: matches[0].node_id}}}))
      }
    }
    catch(e) {
      console.log(`addNodes failed: ${e.message}`)
    }
  }
  console.log(`added data for ${nodes.length} nodes to the database in ${Date.now() - date}ms of which ${new_nodes} were new.`)
  return ids
}

module.exports = addNodes