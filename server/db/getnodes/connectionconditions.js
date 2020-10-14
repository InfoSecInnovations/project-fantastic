/**
 * 
 * @param {'from' | 'to'} dir 
 * @param {{ip_id: number}[]} ips 
 * @param {import('../types').NodeQuery} query 
 * @param {import('./types').ConnectionFilter} connection_filter
 * @returns {import('fantastic-utils/db/types').QueryCondition[]}
 */
const connectionConditions = (dir, ips, query, connection_filter) => {
  const conditions = [{columns: {[`${dir}_id`]: ips.map(v => v.ip_id)}, compare: 'IN'}]
  if (query.connection_type === 'different_ip') conditions.push({columns: [['from_id', 'to_id']], compare: '!='})
  if (query.connection_type === 'different_host') conditions.push({columns: {[`${dir == 'from' ? 'to' : 'from'}_id`]: ips.map(v => v.ip_id)}, compare: 'NOT IN'})
  const connection_state = query.connection_state && query.connection_state.filter(v => v)
  if (connection_state && connection_state.length && !connection_state.includes('all')) conditions.push({columns: {state: connection_state}, compare: 'IN'})
  if (connection_filter.local_ip_id) conditions.push({columns: {from_id: connection_filter.local_ip_id}})
  if (connection_filter.remote_ip_id) conditions.push({columns: {to_id: connection_filter.remote_ip_id}})
  if (connection_filter.process_id) conditions.push({columns: {process_id: connection_filter.process_id}})
  return conditions
}

module.exports = connectionConditions