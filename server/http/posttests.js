const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunTest = require('../tests/runtest')
const GetHTTPData = require('fantastic-utils/gethttpdata')
const Auth = require('./auth')
const GetAsset = require('../util/getpackageddata')
const HasRole = require('fantastic-utils/hasrole')
const End = require('./end')

const postTests = (res, req, tests) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  const header = req.getHeader('cookie')
  console.log('-----------')
  console.log(`received http request to start ${query.test}...`)
  GetHTTPData(res)
  .then(async data => {
    const user = await Auth(header)
    if (!user) return End(res)
    if (!tests.includes(query.test)) return End(res)
    const test = await GetAsset(query.test)
    if (!HasRole(user, test.role)) return End(res)
    const date = Date.now()
    try {
      const json = JSON.parse(data)
      if (!query.nodes || !Array.isArray(query.nodes) || !query.test) return End(res)
      const result = await RunTest(query.test, user, date, query.nodes, json)
      if (res.aborted) return
      console.log(`completed quest ${query.test}, queried ${result.length} nodes`)
      console.log('-----------')
      res.end(JSON.stringify({result, date}))
    }
    catch(err) {
      return End(res)
    }
  })
}

module.exports = postTests