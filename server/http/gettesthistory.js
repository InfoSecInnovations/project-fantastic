const { all } = require('fantastic-utils/db')(require('../db/path'))
const Abort = require('./abort')

const getQuestHistory = (res, req) => {
  res.onAborted(() => Abort(res))
  const start = Date.now()
  console.log('-----------')
  console.log(`http request for test history incoming...`)
  all({table: 'test_history'}).then(rows => {
    if (res.aborted) return
    console.log(`got test history from database in ${Date.now() - start}ms, returning results!`)
    console.log('-----------')
    res.end(JSON.stringify(rows))
  })
}

module.exports = getQuestHistory