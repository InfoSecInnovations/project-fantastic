const {all} = require('../db')
const GetTest = require('../util/getpackagedasset')
const RunAction = require('../actions/runactionfunction')
const CheckResult = require('./checkresult')
const UpdateHistory = require('./updatehistory')

const runTest = async (test, user_id, date, min_date, parameters) => {
  const date_condition = {columns: {date: min_date || 0}, compare: '>='} // if we didn't supply a date we want to get all of the results TODO: use full search criteria
  const obj = await GetTest(test)
  const nodes = await all({table: 'nodes', conditions: {groups: [{columns: {access: obj.hosts}, compare: 'IN'}, date_condition]}})
  const results = []
  for (const action of obj.actions) {
    for (const node of nodes) {
      const result = await RunAction(action.path, 'run', node.node_id, user_id, date)
      results.push({node_id: node.node_id, result: CheckResult(result, action.search, parameters)})
    }
  }
  await UpdateHistory(test, user_id, date, results, parameters)
  return results
}

module.exports = runTest