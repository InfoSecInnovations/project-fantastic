const {all} = require('../db')
const GetTest = require('../util/getpackageddata')
const RunAction = require('../actions/runaction')
const CheckResult = require('./checkresult')
const UpdateHistory = require('./updatehistory')

const convert_time = time => (time && (time.d || 0) * 1000 * 60 * 60 * 24 + (time.h || 0) * 1000 * 60 * 60 + (time.m || 0) * 1000 * 60 + (time.s ||0) * 1000) ||0

const runTest = async (test, user, date, nodes, parameters) => {
  const nodes_condition = Array.isArray(nodes) ? {columns: {node_id: nodes}, compare: 'IN'} : {columns: {date: Date.now() - convert_time(nodes.age)}, compare: '>='}
  const obj = await GetTest(test)
  const rows = await all({table: 'nodes', conditions: {groups: [{columns: {access: obj.hosts}, compare: 'IN'}, nodes_condition]}})
  const results = []
  for (const action of obj.actions) {
    for (const row of rows) {
      const result = await RunAction(action.path, 'run', row.node_id, user, date)
      results.push({node_id: row.node_id, result: CheckResult(result, action.search, parameters)})
    }
  }
  UpdateHistory(test, user.user_id, date, results, parameters)
  return results
}

module.exports = runTest