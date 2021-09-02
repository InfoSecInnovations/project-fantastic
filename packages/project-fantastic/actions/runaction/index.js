const GetPackagedData = require('../../util/getpackageddata')
const RunFunction = require('./runfunction')

/**
 * Run a function from an action and record it in the database
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {string} action 
 * @param {string} func 
 * @param {number} node_id 
 * @param {import('@infosecinnovations/fantastic-utils/types').User} user 
 * @param {number} date 
 * @param {{
 *  data?: {},
 *  label?: string,
 *  scan_id?: number
 * }} [options]
 */
const runAction = async (db, action, func, node_id, user, date, options) => {
  const row = await db.get({table: 'nodes', conditions: {columns: {node_id}}})
  const hostname = row.access === 'local' ? '' : row.hostname
  const obj = await GetPackagedData(action, 'actions')
  const result = await RunFunction(obj, func, user, hostname, options && options.data)
  if (!result.error) {
    for (const r of result.results) {
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
  }
  const event_id = await db.insert('action_history', {
    result: JSON.stringify(result.error ? result : result.results), 
    data: options && options.data && JSON.stringify(options.data), 
    filter: result.filter, 
    date, 
    action, 
    function: func, 
    node_id, 
    label: options && options.label, 
    user_id: user.user_id, 
    scan_id: options && options.scan_id,
    story_id: options && options.story_id
  })
  return {result, event_id}
}

module.exports = runAction