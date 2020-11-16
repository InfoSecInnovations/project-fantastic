const GetPackagedData = require('../util/getpackageddata')
const RunAction = require('../actions/runaction')
const CheckResult = require('./checkresult')
const GetAbsolutePath = require('../util/getabsolutedatapath')

/**
 * 
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {string} test 
 * @param {import('@infosecinnovations/fantastic-utils/types').User user 
 * @param {number} date 
 * @param {number[]} nodes database IDs of nodes we're running the test on
 * @param {Object.<string, *>} parameters 
 * @param {number} [quest_id] database ID of quest event that called this test run 
 */
const runTest = async (db, test, user, date, nodes, parameters, quest_id) => {
  const obj = await GetPackagedData(test, 'tests')
  const event_id = await db.insert('test_history', {test, date, parameters: JSON.stringify(parameters), user_id: user.user_id, quest_id})
  const rows = await db.all({table: 'nodes', conditions: {groups: [{columns: {access: obj.hosts}, compare: 'IN'}, {columns: {node_id: nodes}, compare: 'IN'}]}})
  const results = []
  for (const action of obj.actions) {
    for (const row of rows) {
      const action_path = GetAbsolutePath(action.path, test)
      const result = (await RunAction(db, action_path, 'run', row.node_id, user, date, {test_id: event_id})).result
      if (obj.pass === "review") results.push({node_id: row.node_id, result: result.results, filter: result.filter, action: action_path})
      else results.push({node_id: row.node_id, result: CheckResult(result.results, action.search, parameters), action: action_path})
    }
  }
  await db.update({table: 'test_history', row: {results: JSON.stringify(results)}, conditions: {columns: {test_id: event_id}}})
  return {results, event_id}
}

module.exports = runTest