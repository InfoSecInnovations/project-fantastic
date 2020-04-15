const {all} = require('../db/operations')
const GetQuest = require('../util/getpackagedasset')
const RunAction = require('../actions/runactionfunction')
const CheckResult = require('./checkresult')
const UpdateHistory = require('./updatehistory')

const runQuest = async (quest, date, min_date) => {
  const date_condition = {columns: {date: min_date || 0}, compare: '>='} // if we didn't supply a date we want to get all of the results
  const obj = GetQuest(quest)
  const nodes = await all({table: 'nodes', conditions: {groups: [{columns: {access: obj.hosts}, compare: 'IN'}, date_condition]}})
  const results = []
  for (const action of obj.actions) {
    for (const node of nodes) {
      const result = await RunAction(action.path, 'run', node.node_id, date)
      results.push({node_id: node.node_id, result: CheckResult(result, action.search)})
    }
  }
  await UpdateHistory(quest, date, results)
  return results
}

module.exports = runQuest