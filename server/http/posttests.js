const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunTest = require('../tests/runtest')
const ValidateRole = require('./auth/validaterole')

const postTests = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to start ${query.test}...`)
  ValidateRole(res, req, 'user') // TODO: validate required role for quest
  .then(valid => {
    if (!valid) return !res.aborted && res.end()
    const date = Date.now()
    let buffer
    res.onData((data, isLast) => {
      let chunk = Buffer.from(data)
      buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])
      if (isLast) {
        const json = JSON.parse(buffer)
        RunTest(query.test, date, query.date, json)
        .then(result => {
          if (res.aborted) return
          console.log(`completed quest ${query.test}, queried ${result.length} nodes`)
          console.log('-----------')
          res.end(JSON.stringify({result, date}))
        })
      }
    })
  })
}

module.exports = postTests