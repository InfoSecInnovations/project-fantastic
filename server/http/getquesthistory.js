const { all } = require('../db')
const Abort = require('./abort')

const getQuestHistory = (res, req) => {
  res.onAborted(() => Abort(res))
  const start = Date.now()
  console.log('-----------')
  console.log(`http request for quest history incoming...`)
  // TODO: filter by user
  all({table: 'quest_history'}).then(rows => {
    if (res.aborted) return
    console.log(`got quest history from database in ${Date.now() - start}ms, returning results!`)
    console.log('-----------')
    res.end(JSON.stringify(rows))
  })
}

module.exports = getQuestHistory