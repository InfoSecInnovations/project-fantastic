const {all, get} = require('./operations')

const getNodes = async (date, connection_type) => {
  const date_condition = {columns: {date: date || 0}, compare: '>='} // if we didn't supply a date we want to get all of the results
  const rows = await all({table: 'nodes', conditions: date_condition})
  const nodes = []

  const get_connections = ips => {
    if (!connection_type || connection_type == 'all') return all({table: 'connections', conditions: {groups: [{columns: {from_id: ips.map(v => v.ip_id)}, compare: 'IN'}, date_condition]}})
    if (connection_type == 'different_ip') return all({table: 'connections', conditions: { groups: [
      {columns: {from_id: ips.map(v => v.ip_id)}, compare: 'IN'}, 
      date_condition, 
      {columns: [['from_id', 'to_id']], compare: '!='}
    ]}})
    return all({table: 'connections', conditions: { groups: [
      {columns: {from_id: ips.map(v => v.ip_id)}, compare: 'IN'}, 
      date_condition, 
      {columns: {to_id: ips.map(v => v.ip_id)}, compare: 'NOT IN'}
    ]}})
  }

  for (r of rows) {
    const ips = await all({table: 'ips', conditions: {groups: [{columns: {node_id: r.node_id}}, date_condition]}})
    const connections = await get_connections(ips)
    .then(async res => {
      for (c of res) {
        c.process = await get({table: 'processes', columns: ['name', 'pid'], conditions: {columns: {process_id: c.process_id}}}) // get process name and PID for each connection
        .then(res => ({id: res.pid, name: res.name}))
      }
      return res
    })
    .then(async res => {
      for (c of res) { // for each connection, get the local and remote addresses using the IDs
        c.local_address = await get({table: 'ips', columns: ['ip'], conditions: {columns: {ip_id: c.from_id}}}).then(res => res.ip)
        c.remote_address = await get({table: 'ips', columns: ['ip'], conditions: {columns: {ip_id: c.to_id}}}).then(res => res.ip)
      }
      return res
    }) || []
    nodes.push({...r, connections, ips: ips.map(v => v.ip)})
  }
  return nodes
}

module.exports = getNodes