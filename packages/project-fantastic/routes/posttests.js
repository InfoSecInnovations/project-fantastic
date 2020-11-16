const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const Abort = require('./abort')
const RunTest = require('../tests/runtest')
const GetHTTPData = require('@infosecinnovations/fantastic-utils/gethttpdata')
const Auth = require('./auth')
const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const {transaction} = require('../db')

const postTests = (res, req, tests) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  const header = req.getHeader('cookie')
  console.log(`postTests: received http request to start ${query.test} test...`)
  GetHTTPData(res)
  .then(async data => {
    const user = await Auth(header)
    if (!user) return End(res)
    if (!tests.includes(query.test)) return End(res)
    const test = await GetPackagedData(query.test, 'tests')
    if (!HasRole(user, test.role)) return End(res)
    const date = Date.now()
    try {
      const json = !data ? undefined : JSON.parse(data)
      if (!query.nodes || !Array.isArray(query.nodes)) return End(res)
      const db = await transaction()
      const result = await RunTest(db, query.test, user, date, query.nodes, json)
      await db.insert('all_history', {event_type: 'test', event_id: result.event_id, user_id: user.user_id, date})
      await db.close()
      if (res.aborted) return
      console.log(`postTests: completed ${query.test} test, queried ${result.results.length} nodes`)
      res.end(JSON.stringify({result: result.results, date}))
    }
    catch(err) {
      return End(res)
    }
  })
}

module.exports = postTests