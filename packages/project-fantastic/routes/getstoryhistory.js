const { transaction } = require('../db')
const GetPackagedData = require('../util/getpackageddata')

const getStoryHistory = async (user, res, req, query) => {
  const start = Date.now()
  console.log(`getStoryHistory: http request for story history incoming...`)
  const db = await transaction()
  const result_rows = await db.all({
    table: 'story_history',
    columns: ['MAX(date) AS date', 'story', 'story_node_id', 'rows', 'story_id'], 
    conditions: {columns: {user_id: user.user_id}},
    group_by: ['story', 'story_node_id']
  })
  .then(async rows => {
    for (const row of rows) {
      const story = await GetPackagedData(row.story, 'stories')
      const node = story.nodeData[row.story_node_id]
      if (node.type == 'scans') {
        const results = await db.get({
          table: 'scan_history',
          columns: ['results', 'scan_id', 'parameters'],
          conditions: {columns: {story_id: row.story_id}}
        })
        row.results = results.results
        row.scan_id = results.scan_id
        const approval = await db.get({
          table: 'approval_history',
          columns: ['approved'],
          conditions: {columns: {scan_id: results.scan_id}}
        })
        row.approved = approval && approval.approved
      }
    }
    return rows
  })
  const completed_nodes = await db.all({
    table: 'completed_story_nodes',
    columns: ['story', 'story_node_id'],
    conditions: {columns: {user_id: user.user_id}}
  })
  await db.close()
  if (res.aborted) return
  console.log(`getStoryHistory: got story history from database in ${Date.now() - start}ms, returning results!`)
  res.end(JSON.stringify({result_rows, completed_nodes}))
}

module.exports = getStoryHistory