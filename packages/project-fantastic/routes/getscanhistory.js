const { transaction } = require('../db')
const GetHistoryItem = require('../db/gethistoryitem')

const getQuestHistory = async (user, res, req, query) => {
  const start = Date.now()
  console.log(`getScanHistory: http request for scan history incoming...`)
  const db = await transaction()
  const rows = await db.all({
    table: 'scan_history', 
    columns: ['MAX(date) AS date', 'scan', 'results', 'parameters', 'scan_id'],
    conditions: {columns: {user_id: user.user_id}},
    group_by: ['scan']
  })
  .then(async rows => {
    for (const row of rows) {
      row.history_item = await GetHistoryItem(db, user, row)
      const approval = await db.get({
        table: 'approval_history',
        columns: ['approved'],
        conditions: {columns: {scan_id: row.scan_id}}
      })
      row.approved = approval && approval.approved
    }
    return rows
  })
  await db.close()
  if (res.aborted) return
  console.log(`getScanHistory: got scan history from database in ${Date.now() - start}ms, returning results!`)
  res.end(JSON.stringify(rows))
}

module.exports = getQuestHistory