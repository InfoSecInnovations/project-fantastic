const RunTest = require('../tests/runtest')
const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const {transaction} = require('../db')
const RunAction = require('../actions/runaction')
const getAbsoluteDataPath = require('../util/getabsolutedatapath')

const postTestResolve = async (user, res, req, query) => {
  console.log(`postTestResolve: received http request to resolve test history item ${query.test_id}...`)

  const date = Date.now()
  try {
    const db = await transaction()
    const currentResult = await db.get({table: 'test_history', columns: ['results', 'parameters', 'test'], conditions: {columns: {test_id: query.test_id}}})
    const test = currentResult.test
    const test_obj = await GetPackagedData(test, 'tests')
    if (!HasRole(user, test_obj.role)) {
      await db.close()
      return End(res)
    } 
    const results = JSON.parse(currentResult.results)
    const failed = results.filter(row => row.result != test_obj.pass.condition).map(row => row.node_id)
    await Promise.all(failed.map(row => RunAction(
      db, 
      getAbsoluteDataPath(test_obj.pass.failure.action.path, test),
      test_obj.pass.failure.action.function || 'run',
      row,
      user,
      date,
      { data: test_obj.pass.failure.action.data }
    )))
    const result = await RunTest(db, test, user, date, results.map(row => row.node_id), JSON.parse(currentResult.parameters))
    // TODO: complete daily quest or story node this test was from
    await db.insert('all_history', {event_type: 'test', event_id: result.event_id, user_id: user.user_id, date})
    await db.close()
    if (res.aborted) return
    console.log(`postTestResolve: resolved test history item ${query.test_id}, queried ${result.results.length} nodes`)
    res.end(JSON.stringify({result: result.results, date}))
  }
  catch(err) {
    return End(res)
  }
}

module.exports = postTestResolve