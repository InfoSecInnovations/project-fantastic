const { transaction } = require('../db')

const postReview = async (user, res, req, query) => {
console.log(`postReview: received http request to review ${query.data_key} results...`)
  const date = Date.now()
  const db = await transaction()
  let scan_id
  const approved = query.approved === 'true' ? 1 : 0
  if (query.type === 'quests') {
    const quest_result = await db.get({      
      table: 'quest_history',
      columns: ['MAX(date) AS date', 'quest_id'], 
      conditions: {columns: {quest: query.data_key, user_id: user.user_id}},
      group_by: ['quest']
    })
    if (quest_result) scan_id = (await db.get({
      table: 'scan_history',
      columns: ['scan_id'],
      conditions: {columns: {quest_id: quest_result.quest_id}}
    })).scan_id
    if (quest_result && approved) {
      await db.update({table: 'daily_quests', row: {date_completed: date}, conditions: {columns: {user_id: user.user_id, quest: query.data_key}}})
    }
  }
  else if (query.type === 'stories') {
    const story_result = await db.get({      
      table: 'story_history',
      columns: ['MAX(date) AS date', 'story_id'], 
      conditions: {columns: {
        story: query.data_key, 
        story_node_id: query.story_node, 
        user_id: user.user_id
      }},
      group_by: ['story', 'story_node_id']
    })
    if (story_result) scan_id = (await db.get({
      table: 'scan_history',
      columns: ['scan_id'],
      conditions: {columns: {story_id: story_result.story_id}}
    })).scan_id
    if (approved) {
      await db.insert('completed_story_nodes', {
        story: query.data_key,
        story_node_id: query.story_node,
        date,
        user_id: user.user_id
      })
    }
  }
  else {
    const scan_result =  await db.get({      
      table: 'scan_history',
      columns: ['MAX(date) AS date', 'scan_id'], 
      conditions: {columns: {scan: query.data_key, user_id: user.user_id}},
      group_by: ['scan']
    })
    if (scan_result) scan_id = scan_result.scan_id
  }
  if (scan_id) {
    await db.insert('approval_history', {scan_id, approved, user_id: user.user_id})
    await db.close()
    console.log(`postReview: updated approval status for ${query.data_key}.`)
    return res.end(JSON.stringify({approved, date}))
  }
  await db.close()
  if (res.aborted) return
  console.log(`postReview: unable to update approval status for ${query.data_key}.`)
  return res.end(JSON.stringify({approved: false, date}))
}

module.exports = postReview