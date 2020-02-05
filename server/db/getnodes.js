const {all, get} = require('./operations')

const getNodes = async (date, connection_type, connection_state) => {
  const date_condition = {columns: {date: date || 0}, compare: '>='} // if we didn't supply a date we want to get all of the results
  const rows = await all({table: 'nodes', conditions: date_condition})
  const nodes = []
 
  for (r of rows) {
    const ips = await all({table: 'ips', conditions: {groups: [{columns: {node_id: r.node_id}}]}})

    const connection_conditions = dir => {
      const conditions = [date_condition, {columns: {[`${dir}_id`]: ips.map(v => v.ip_id)}, compare: 'IN'}]
      if (connection_type === 'different_ip') conditions.push({columns: [['from_id', 'to_id']], compare: '!='})
      if (connection_type === 'different_host') conditions.push({columns: {[`${dir == 'from' ? 'to' : 'from'}_id`]: ips.map(v => v.ip_id)}, compare: 'NOT IN'})
      if (connection_state && connection_state !== 'all') conditions.push({columns: {state: connection_state}, compare: Array.isArray(connection_state) ? 'IN' : undefined})
      return conditions
    }

    const connections = await all({table: 'connections', conditions: {groups: connection_conditions('from')}})
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

    if (!r.important && !connections.length && !await get({table: 'connections', conditions: {groups: connection_conditions('to')}})) continue // if this node isn't marked as important, and nothing connects with it, we don't show it
    const macs = await all({table: 'macs', conditions: {groups: [{columns: {node_id: r.node_id}}]}}) // if we got this far we want to add the MAC Addresses for this node
    nodes.push({...r, connections, ips: ips.map(v => v.ip), macs})
  }
  
  return nodes
}

module.exports = getNodes