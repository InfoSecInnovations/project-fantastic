const { transaction } = require('../db')
const Abort = require('./abort')
const Auth = require('./auth')

const getQuestHistory = (res, req) => {
  Abort(res)
  const start = Date.now()

  console.log(`getTestHistory: http request for test history incoming...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const db = await transaction()
    const rows = await db.all({
      table: 'test_history', 
      columns: ['MAX(date) AS date', 'test', 'results', 'parameters', 'test_id'],
      conditions: {columns: {user_id: user.user_id}},
      group_by: ['test']
    })
    .then(async rows => {
      for (const row of rows) {
        const approval = await db.get({
          table: 'approval_history',
          columns: ['approved'],
          conditions: {columns: {test_id: row.test_id}}
        })
        row.approved = approval && approval.approved
      }
      return rows
    })
    await db.close()
    if (res.aborted) return
    console.log(`getTestHistory: got test history from database in ${Date.now() - start}ms, returning results!`)
    res.end(JSON.stringify(rows))
  })
}

module.exports = getQuestHistory