const ConnectionConditions = require('./connectionconditions')

/**
 * 
 * @param {import('fantastic-utils/db/operations').Operations} db 
 * @param {{ip_id: number}[]} ips 
 * @param {import('./index').NodeQuery} query 
 * @param {import('fantastic-utils/db/operations').QueryCondition[]} date_conditions
 */
const getConnections = (db, ips, query, date_conditions) => db.all({table: 'connections', conditions: {groups: [...date_conditions, ...ConnectionConditions('from', ips, query)]}})
  .then(async res => {
    for (const c of res) {
      c.process = await db.get({table: 'processes', columns: ['name', 'pid'], conditions: {columns: {process_id: c.process_id}}}) // get process name and PID for each connection
      .then(res => ({id: res.pid, name: res.name}))
    }
    return res
  })
  .then(async res => {
    for (const c of res) { // for each connection, get the local and remote addresses using the IDs
      c.local_address = await db.get({table: 'ips', columns: ['ip'], conditions: {columns: {ip_id: c.from_id}}}).then(res => res.ip)
      const remote = await db.get({table: 'ips', columns: ['ip', 'node_id'], conditions: {columns: {ip_id: c.to_id}}})
      c.to_node = remote.node_id
      c.remote_address = remote.ip
    }
    return res
  }) || []

module.exports = getConnections