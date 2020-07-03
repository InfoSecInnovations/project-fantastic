const { all } = require('../db')
const Abort = require('./abort')
const Auth = require('./auth')

const getQuestHistory = (res, req) => {
  Abort(res)
  const start = Date.now()
  console.log(`getQuestHistory: http request for quest history incoming...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const rows = await all({
      table: 'quest_history',
      columns: ['MAX(date) AS date', 'quest', 'results', 'rows'], 
      conditions: {columns: {user_id: user.user_id}},
      group_by: ['quest']
    })
    if (res.aborted) return
    console.log(`getQuestHistory: got quest history from database in ${Date.now() - start}ms, returning results!`)
    res.end(JSON.stringify(rows))
  })
}

module.exports = getQuestHistory