const {transaction, OPEN_READONLY} = require('../operations')
const GetConnections = require('./getconnections')

/**
 * Retrieve nodes from the database based on the query object
 * @param {import('../types').NodeQuery} query 
 * @returns {Promise<Array.<import('../types').Node & {connections: [], node_id: number}>>}
 */
const getNodes = async query => {
  const date_conditions = [ // if we didn't supply a date we want to get all of the results
    query.date && {columns: {date: query.date}, compare: '>='}, 
    query.max_date && {columns: {first_date: query.max_date}, compare: '<='}
  ] 
  const node_access = query.access && query.access.filter(v => v)
  const access_condition = node_access && node_access.length && {columns: {access: node_access}, compare: 'IN'}
  const db = await transaction(OPEN_READONLY)
  const network_hosts = await db.all({table: 'nodes', conditions: {
    groups: [
      ...date_conditions, 
      query.nodes && Array.isArray(query.nodes) && {columns: {node_id: query.nodes}, compare: 'IN'}, 
      access_condition,
      {columns: {important: true}}
    ]}})
  const connection_filter = {
    local_ip_id: query.connection_local_ip && (await db.get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip: query.connection_local_ip}}})).ip_id,
    remote_ip_id: query.connection_remote_ip && (await db.get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip: query.connection_remote_ip}}})).ip_id,
    process_id: query.connection_process && (await db.get({table: 'processes', columns: ['process_id'], conditions: {columns: {pid: query.connection_process}}})).process_id,
  }
  const host_nodes = []
  for (const h of network_hosts) {
    const ips = await db.all({table: 'ips', conditions: {groups: [{columns: {node_id: h.node_id}}, ...date_conditions]}})
    const connections = await GetConnections(db, ips, query, date_conditions, connection_filter)
    const macs = await db.all({table: 'macs', conditions: {groups: [{columns: {node_id: h.node_id}}]}})
    host_nodes.push({...h, connections, ips: ips.map(v => v.ip), macs})
  }
  const nodes = []
  if (query.show_external == 'true') {
    const external_ip_ids = host_nodes.map(v => v.connections).flat().filter(v => v.from_id != v.to_id).map(v => v.to_id)
    const external_ips = await db.all({
      table: 'ips',
      columns: ['node_id'],
      conditions: {columns: {ip_id: external_ip_ids}, compare: 'IN'}
    })
    const external_node_ids = external_ips.map(v => v.node_id)
    const other = await db.all({table: 'nodes', conditions: {
      groups: [
        ...date_conditions, 
        query.nodes && Array.isArray(query.nodes) && {columns: {node_id: query.nodes}, compare: 'IN'}, 
        access_condition,
        {columns: {important: null}},
        {columns: {node_id: external_node_ids}, compare: 'IN'}
      ]
    }})
    for (const o of other) {
      const ips = await db.all({table: 'ips', conditions: {groups: [{columns: {node_id: o.node_id}}, ...date_conditions]}})
      const connections = await GetConnections(db, ips, query, date_conditions, connection_filter)
      const macs = await db.all({table: 'macs', conditions: {groups: [{columns: {node_id: o.node_id}}]}})
      nodes.push({...o, connections, ips: ips.map(v => v.ip), macs}) 
    }
  }
  await db.close()
  return [...host_nodes, ...nodes]
}

module.exports = getNodes