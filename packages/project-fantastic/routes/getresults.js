const { transaction } = require('../db')
const GetHistoryItem = require('../db/gethistoryitem')

const getResults = async (user, res, req, query) => {
  const start = Date.now()
  console.log(`getResults: http request for results from ${query.nodes.length} nodes incoming...`)
  const db = await transaction()
  const rows = await db.all(
    {
      table: 'action_history', 
      columns: ['MAX(date) AS date', 'action', 'function', 'label', 'node_id', 'data', 'result', 'filter', 'scan_id', 'story_id', 'action_id'],
      conditions: {groups: [{columns: {node_id: query.nodes}, compare: 'IN'}, {columns: {user_id: user.user_id}}]},
      group_by: ['action', 'function', 'label', 'node_id']
    }
  )
  for (const row of rows) {
    row.history_item = await GetHistoryItem(db, user, row)
  }
  await db.close()
  if (res.aborted) return
  console.log(`getResults: got results from ${query.nodes.length} nodes from database in ${Date.now() - start}ms, returning results!`)
  res.end(JSON.stringify(rows))
}

module.exports = getResults