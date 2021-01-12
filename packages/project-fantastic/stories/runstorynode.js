const GetPackagedData = require('../util/getpackageddata')
const RunTest = require('../tests/runtest')
const RunAction = require('../actions/runaction')
const {getNodes} = require('../db')
const ConvertTime = require('@infosecinnovations/fantastic-utils/converttime')

/**
 * Run a quest
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {string} story 
 * @param {string} story_node_id
 * @param {import('@infosecinnovations/fantastic-utils/types').User} user 
 * @param {number} date 
 */
const runStoryNode = async (db, story, story_node_id, user, date) => {
  const story_obj = await GetPackagedData(story, 'stories')
  const rows = await getNodes({date: Date.now() - ConvertTime(story_obj.questConfig.selection.age), access: story_obj.questConfig.hosts})
  const row_ids = rows.map(v => v.node_id)
  const event_id = await db.insert('story_history', {story, story_node_id, date, user_id: user.user_id, rows: JSON.stringify(row_ids)})
  const node = story_obj.nodeData[story_node_id]
  const results = node.type == 'tests' ? (await RunTest(db, node.key, user, date, row_ids, node.parameters, event_id, 'story')).results :
  await Promise.all(row_ids.map(node_id => RunAction(db, node.key, 'run', node_id))).then(() => true)
  let success = true
  if (node.type == 'tests') {
    const test = await GetPackagedData(node.key, 'tests')
    if (test.pass == 'review') success = false
    else success = results.every(r => r.result == test.pass.condition)
  }
  if (success) await db.insert('completed_story_nodes', {story, story_node_id, user_id: user.user_id, date})
  return {results, rows, event_id, success}
}

module.exports = runStoryNode