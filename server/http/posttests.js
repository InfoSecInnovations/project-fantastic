const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunTest = require('../tests/runtest')
const ValidateRole = require('./auth/validaterole')
const GetHTTPData = require('fantastic-utils/gethttpdata')

const postTests = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  const header = req.getHeader('cookie')
  console.log('-----------')
  console.log(`received http request to start ${query.test}...`)
  GetHTTPData(res)
  .then(async data => {
    const valid = await ValidateRole(header, 'user')
    if (!valid) return !res.aborted && res.end()
    const date = Date.now()
    const json = JSON.parse(data)
    const result = await RunTest(query.test, date, query.date, json)
    if (res.aborted) return
    console.log(`completed quest ${query.test}, queried ${result.length} nodes`)
    console.log('-----------')
    res.end(JSON.stringify({result, date}))
  })
}

module.exports = postTests