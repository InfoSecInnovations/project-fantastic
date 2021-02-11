const GetPackagedData = require('../util/getpackageddata')
const RunAction = require('../actions/runaction')
const CheckResult = require('./checkresult')
const GetAbsolutePath = require('../util/getabsolutedatapath')

/**
 * 
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {string} scan 
 * @param {import('@infosecinnovations/fantastic-utils/types').User user 
 * @param {number} date 
 * @param {number[]} nodes database IDs of nodes we're running the scan on
 * @param {Object.<string, *>} parameters 
 * @param {number} [parent_event_id] database ID of parent event that called this scan run 
 * @param {string} [parent_event_type] type of parent event that called this scan run 
 */
const runScan = async (db, scan, user, date, nodes, parameters, parent_event_id, parent_event_type = 'quest') => {
  const obj = await GetPackagedData(scan, 'scans')
  const event_id = await db.insert('scan_history', {
    scan, 
    date, 
    parameters: JSON.stringify(parameters), 
    user_id: user.user_id, 
    quest_id: parent_event_type == 'quest' ? parent_event_id : undefined, 
    story_id: parent_event_type == 'story' ? parent_event_id : undefined
  })
  const rows = await db.all({table: 'nodes', conditions: {groups: [{columns: {access: obj.hosts}, compare: 'IN'}, {columns: {node_id: nodes}, compare: 'IN'}]}})
  const results = []
  for (const action of obj.actions) {
    for (const row of rows) {
      const action_path = GetAbsolutePath(action.path, scan)
      const result = (await RunAction(db, action_path, 'run', row.node_id, user, date, {scan_id: event_id})).result
      if (obj.pass === "review") results.push({node_id: row.node_id, result: result.results, filter: result.filter, action: action_path})
      else results.push({node_id: row.node_id, result: CheckResult(result.results, action.search, parameters), action: action_path})
    }
  }
  await db.update({table: 'scan_history', row: {results: JSON.stringify(results)}, conditions: {columns: {scan_id: event_id}}})
  return {results, event_id}
}

module.exports = runScan