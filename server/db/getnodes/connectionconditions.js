/**
 * 
 * @param {'from' | 'to'} dir 
 * @param {{ip_id: number}[]} ips 
 * @param {import('./index').NodeQuery} query 
 */
const connectionConditions = (dir, ips, query) => {
  const conditions = [{columns: {[`${dir}_id`]: ips.map(v => v.ip_id)}, compare: 'IN'}]
  if (query.connection_type === 'different_ip') conditions.push({columns: [['from_id', 'to_id']], compare: '!='})
  if (query.connection_type === 'different_host') conditions.push({columns: {[`${dir == 'from' ? 'to' : 'from'}_id`]: ips.map(v => v.ip_id)}, compare: 'NOT IN'})
  const connection_state = query.connection_state && query.connection_state.filter(v => v)
  if (connection_state && connection_state.length && !connection_state.includes('all')) conditions.push({columns: {state: connection_state}, compare: 'IN'})
  return conditions
}

module.exports = connectionConditions