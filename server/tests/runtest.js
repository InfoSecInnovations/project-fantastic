const GetPackagedData = require('../util/getpackageddata')
const RunAction = require('../actions/runaction')
const CheckResult = require('./checkresult')

const runTest = async (db, test, user, date, nodes, parameters, quest_id) => {
  const obj = await GetPackagedData(test, 'tests')
  const event_id = await db.insert('test_history', {test, date, parameters: JSON.stringify(parameters), user_id: user.user_id, quest_id})
  const rows = await db.all({table: 'nodes', conditions: {groups: [{columns: {access: obj.hosts}, compare: 'IN'}, {columns: {node_id: nodes}, compare: 'IN'}]}})
  const results = []
  for (const action of obj.actions) {
    for (const row of rows) {
      const result = await RunAction(db, action.path, 'run', row.node_id, user, date, {test_id: event_id})
      if (obj.pass === "review") results.push({node_id: row.node_id, result})
      else results.push({node_id: row.node_id, result: CheckResult(result.result, action.search, parameters)})
    }
  }
  await db.update({table: 'test_history', row: {results: JSON.stringify(results)}, conditions: {columns: {test_id: event_id}}})
  return {results, event_id}
}

module.exports = runTest