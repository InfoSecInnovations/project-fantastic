const { all } = require('../db')
const Abort = require('./abort')
const Auth = require('./auth')

const getQuestHistory = (res, req) => {
  Abort(res)
  const start = Date.now()

  console.log(`getQuestHistory: http request for test history incoming...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const rows = await all({
      table: 'test_history', 
      columns: ['MAX(date) AS date', 'test', 'results', 'parameters'],
      conditions: {columns: {user_id: user.user_id}},
      group_by: ['test']
    })
    if (res.aborted) return
    console.log(`getQuestHistory: got test history from database in ${Date.now() - start}ms, returning results!`)
    res.end(JSON.stringify(rows))
  })
}

module.exports = getQuestHistory