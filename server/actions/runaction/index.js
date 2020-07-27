const GetAction = require('../../util/getpackageddata')
const RunFunction = require('./runfunction')

const runAction = async (db, action, func, node_id, user, date, options) => {
  const row = await db.get({table: 'nodes', conditions: {columns: {node_id}}})
  const hostname = row.access === 'local' ? '' : row.hostname
  const obj = await GetAction(action)
  const result = await RunFunction(obj, func, user, hostname, options && options.data)
  for (const r of result) {
    if (r.followups) {
      for (const v of Object.entries(r.followups)) {
        if (v[1].data) {
          const existing = await db.get({table: 'action_data', columns: ['action_data_id'], conditions: {columns: {user_id: user.user_id, label: r.label, action, function: v[0]}}})
          if (existing) await db.update({table: 'action_data', row: {data: JSON.stringify(v[1].data)}, conditions: {columns: {action_data_id: existing.action_data_id}}})
          else await db.insert('action_data', {data: JSON.stringify(v[1].data), user_id: user.user_id, label: r.label, action, function: v[0]})
        }
      }
    }
  }
  const event_id = await db.insert('action_history', {result: JSON.stringify(result), data: options && options.data && JSON.stringify(options.data),  date, action, function: func, node_id, label: options && options.label, user_id: user.user_id, test_id: options && options.test_id})
  return {result, event_id}
}

module.exports = runAction