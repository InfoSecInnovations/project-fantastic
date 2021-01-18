const { transaction } = require('../db')

const postReview = async (user, res, req, query) => {
console.log(`postReview: received http request to review ${query.data_key} results...`)
  const db = await transaction()
  let test_id
  const approved = query.approved === 'true' ? 1 : 0
  if (query.type === 'quests') {
    const quest_result = await db.get({      
      table: 'quest_history',
      columns: ['MAX(date) AS date', 'quest_id'], 
      conditions: {columns: {quest: query.data_key, user_id: user.user_id}},
      group_by: ['quest']
    })
    if (quest_result) test_id = (await db.get({
      table: 'test_history',
      columns: ['test_id'],
      conditions: {columns: {quest_id: quest_result.quest_id}}
    })).test_id
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
    if (story_result) test_id = (await db.get({
      table: 'test_history',
      columns: ['test_id'],
      conditions: {columns: {story_id: story_result.story_id}}
    })).test_id
    if (approved) {
      await db.insert('completed_story_nodes', {
        story: query.data_key,
        story_node_id: query.story_node,
        date: Date.now(),
        user_id: user.user_id
      })
    }
  }
  else {
    const test_result =  await db.get({      
      table: 'test_history',
      columns: ['MAX(date) AS date', 'test_id'], 
      conditions: {columns: {test: query.data_key, user_id: user.user_id}},
      group_by: ['test']
    })
    if (test_result) test_id = test_result.test_id
  }
  if (test_id) {
    await db.insert('approval_history', {test_id, approved, user_id: user.user_id})
    await db.close()
    console.log(`postReview: updated approval status for ${query.data_key}.`)
    return res.end(JSON.stringify({approved}))
  }
  await db.close()
  if (res.aborted) return
  console.log(`postReview: unable to update approval status for ${query.data_key}.`)
  return res.end(JSON.stringify({approved: false}))
}

module.exports = postReview