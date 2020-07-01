const GetAction = require('../../util/getpackageddata')
const RunFunction = require('./runfunction')

const runAction = async (db, action, func, node_id, user, date, options) => {
  const row = await db.get({table: 'nodes', conditions: {columns: {node_id}}})
  const hostname = row.access === 'local' ? '' : row.hostname
  const obj = await GetAction(action)
  const result = await RunFunction(obj, func, user, hostname, options && options.data)
  const event_id = await db.insert('action_history', {data: JSON.stringify(result), date, action, function: func, node_id, label: options && options.label, user_id: user.user_id, test_id: options && options.test_id})
  return {result, event_id}
}

module.exports = runAction