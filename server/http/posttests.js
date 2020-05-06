const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunTest = require('../tests/runtest')
const GetHTTPData = require('fantastic-utils/gethttpdata')
const Auth = require('./auth')
const GetAsset = require('../util/getpackagedasset')
const HasRole = require('fantastic-utils/hasrole')

const postTests = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  const header = req.getHeader('cookie')
  console.log('-----------')
  console.log(`received http request to start ${query.test}...`)
  GetHTTPData(res)
  .then(async data => {
    const user = await Auth(header)
    if (!user) return !res.aborted && res.end()
    const test = GetAsset(query.test)
    if (!HasRole(user, test.role)) return !res.aborted && res.end()
    const date = Date.now()
    const json = JSON.parse(data)
    const result = await RunTest(query.test, user.user_id, date, query.date, json)
    if (res.aborted) return
    console.log(`completed quest ${query.test}, queried ${result.length} nodes`)
    console.log('-----------')
    res.end(JSON.stringify({result, date}))
  })
}

module.exports = postTests