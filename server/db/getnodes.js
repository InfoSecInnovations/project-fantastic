const {all, get} = require('./operations')

const getNodes = async query => {
  const date_condition = {columns: {date: query.date || 0}, compare: '>='} // if we didn't supply a date we want to get all of the results
  const rows = await all({table: 'nodes', conditions: date_condition})
  const nodes = []
 
  for (const r of rows) {
    const ips = await all({table: 'ips', conditions: {groups: [{columns: {node_id: r.node_id}}, date_condition]}})

    const connection_conditions = dir => {
      const conditions = [date_condition, {columns: {[`${dir}_id`]: ips.map(v => v.ip_id)}, compare: 'IN'}]
      const connection_state = query.connection_state && query.connection_state.filter(v => v)
      if (query.connection_type === 'different_ip') conditions.push({columns: [['from_id', 'to_id']], compare: '!='})
      if (query.connection_type === 'different_host') conditions.push({columns: {[`${dir == 'from' ? 'to' : 'from'}_id`]: ips.map(v => v.ip_id)}, compare: 'NOT IN'})
      if (connection_state && connection_state.length && !connection_state.includes('all')) conditions.push({columns: {state: connection_state}, compare: 'IN'})
      return conditions
    }

    const connections = await all({table: 'connections', conditions: {groups: connection_conditions('from')}})
    .then(async res => {
      for (const c of res) {
        c.process = await get({table: 'processes', columns: ['name', 'pid'], conditions: {columns: {process_id: c.process_id}}}) // get process name and PID for each connection
        .then(res => ({id: res.pid, name: res.name}))
      }
      return res
    })
    .then(async res => {
      for (const c of res) { // for each connection, get the local and remote addresses using the IDs
        c.local_address = await get({table: 'ips', columns: ['ip'], conditions: {columns: {ip_id: c.from_id}}}).then(res => res.ip)
        const remote = await get({table: 'ips', columns: ['ip', 'node_id'], conditions: {columns: {ip_id: c.to_id}}})
        c.to_node = remote.node_id
        c.remote_address = remote.ip
      }
      return res
    }) || []

    const valid_connections = () => connections.length || get({table: 'connections', conditions: {groups: connection_conditions('to')}})
    if (!r.important && (query.show_external !== 'true' || !(await valid_connections()))) continue
    const macs = await all({table: 'macs', conditions: {groups: [{columns: {node_id: r.node_id}}]}}) // if we got this far we want to add the MAC Addresses for this node
    nodes.push({...r, connections, ips: ips.map(v => v.ip), macs})
  }
  
  return nodes
}

module.exports = getNodes