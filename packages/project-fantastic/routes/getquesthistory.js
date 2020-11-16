const { transaction } = require('../db')
const Abort = require('./abort')
const Auth = require('./auth')

const getQuestHistory = (res, req) => {
  Abort(res)
  const start = Date.now()
  console.log(`getQuestHistory: http request for quest history incoming...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const db = await transaction()
    const rows = await db.all({
      table: 'quest_history',
      columns: ['MAX(date) AS date', 'quest', 'rows', 'quest_id'], 
      conditions: {columns: {user_id: user.user_id}},
      group_by: ['quest']
    })
    .then(async rows => {
      for (const row of rows) {
        const results = await db.get({
          table: 'test_history',
          columns: ['results', 'test_id'],
          conditions: {columns: {quest_id: row.quest_id}}
        })
        row.results = results.results
        const approval = await db.get({
          table: 'approval_history',
          columns: ['approved'],
          conditions: {columns: {test_id: results.test_id}}
        })
        row.approved = approval && approval.approved
      }
      return rows
    })
    await db.close()
    if (res.aborted) return
    console.log(`getQuestHistory: got quest history from database in ${Date.now() - start}ms, returning results!`)
    res.end(JSON.stringify(rows))
  })
}

module.exports = getQuestHistory