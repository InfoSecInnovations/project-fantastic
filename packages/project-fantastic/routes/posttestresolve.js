const RunTest = require('../tests/runtest')
const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const {transaction} = require('../db')
const RunAction = require('../actions/runaction')
const getAbsoluteDataPath = require('../util/getabsolutedatapath')

const postTestResolve = async (user, res, req, query, tests) => {
  console.log(`postTests: received http request to resolve ${query.test} test...`)
  if (!tests.includes(query.test)) return End(res)
  const test = await GetPackagedData(query.test, 'tests')
  if (!HasRole(user, test.role)) return End(res)
  const date = Date.now()
  try {
    const db = await transaction()
    const currentResult = await db.get({table: 'test_history', columns: ['rows', 'parameters'], conditions: {columns: {test_id: query.test_id}}})
    const rows = JSON.parse(currentResult.rows)
    const failed = rows.filter(row => row.result != test.pass.condition).map(row => row.node_id)
    await Promise.all(failed.map(row => await RunAction(
      db, 
      getAbsoluteDataPath(test.pass.failure.action.path, query.test),
      test.pass.failure.action.function || 'run',
      row,
      user,
      date,
      {
        data: test.pass.failure.action.data
      }
    )))
    const result = await RunTest(db, query.test, user, date, rows.map(row => row.node_id), JSON.parse(currentResult.parameters))
    // TODO: complete daily quest or story node this test was from
    await db.insert('all_history', {event_type: 'test', event_id: result.event_id, user_id: user.user_id, date})
    await db.close()
    if (res.aborted) return
    console.log(`postTests: resolved ${query.test} test, queried ${result.results.length} nodes`)
    res.end(JSON.stringify({result: result.results, date}))
  }
  catch(err) {
    return End(res)
  }
}

module.exports = postTestResolve