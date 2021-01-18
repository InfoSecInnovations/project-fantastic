const RunStoryNode = require('../stories/runstorynode')
const {transaction} = require('../db')
const GetPackagedData = require('../util/getpackageddata')
const End = require('./end')

const postStoryNode = async (user, res, req, query, stories) => {
  console.log(`postStoryNode: Received http request to run node ${query.node} from story ${query.story}`)
  const date = Date.now()
  const db = await transaction()
  // TODO: validate query
  const storyNodes = await GetPackagedData(query.story, 'stories').then(data => Object.entries(data.nodeData))
  const end = async () => {
    await db.close()
    End(res)
  }
  if (await db.get({ // if we ran this node already, we shouldn't do it again
    table: 'completed_story_nodes',
    conditions: {columns: {story: query.story, story_node_id: query.node}}
  })) return end()
  const parentNodes = storyNodes.filter(node => node[1].targets.includes(query.node)).map(node => node[0])
  if (parentNodes.length && !await db.get({ // if we didn't complete at least one parent node we shouldn't be allowed to run this one
    table: 'completed_story_nodes', 
    conditions: {
      groups: [
        {columns: {story: query.story}}, 
        {columns: {story_node_id: parentNodes}, compare: 'IN'}
      ]
    }
  })) return end()
  const result = await RunStoryNode(db, query.story, query.node, user, date)
  await db.insert('all_history', {event_type: 'story', event_id: result.event_id, date, user_id: user.user_id})
  await db.close()
  if (res.aborted) return
  res.end(JSON.stringify({result: result.results, rows: result.rows, date, success: result.success}))
  console.log(`postStoryNode: ran node ${query.node} from story ${query.story}, queried ${result.rows.length} nodes`)
}

module.exports = postStoryNode