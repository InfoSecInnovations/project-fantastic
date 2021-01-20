const GetPackagedData = require('../util/getpackageddata')
const RunTest = require('../tests/runtest')
const RunAction = require('../actions/runaction')
const {getNodes} = require('../db')
const ConvertTime = require('@infosecinnovations/fantastic-utils/converttime')
const DefaultParameters = require('@infosecinnovations/fantastic-utils/defaultparameters')

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
  const age = ConvertTime(story_obj.questConfig.selection.age)
  const rows = await getNodes({date: age && Date.now() - age, access: story_obj.hosts})
  const row_ids = rows.map(v => v.node_id)
  const event_id = await db.insert('story_history', {story, story_node_id, date, user_id: user.user_id, rows: JSON.stringify(row_ids)})
  const node = story_obj.nodeData[story_node_id]
  if (node.type == 'tests') {
    const {results, event_id: test_id} = await RunTest(
      db, 
      node.key, 
      user, 
      date, 
      row_ids, 
      {...DefaultParameters(await GetPackagedData(node.key, 'tests')), ...node.parameters}, 
      event_id, 
      'story'
    )
    const test = await GetPackagedData(node.key, 'tests')
    const success = test.pass == 'review' ? false : results.every(r => r.result == test.pass.condition)
    if (success) await db.insert('completed_story_nodes', {story, story_node_id, user_id: user.user_id, date})
    await db.update({table: 'story_history', row: {success}, conditions: {columns: {story_id: event_id}}})
    return {results, rows, event_id, test_id, success}
  }
  else {
    const results = await Promise.all(row_ids.map(node_id => RunAction(db, node.key, 'run', node_id, user, date))).then(() => true)
    await db.insert('completed_story_nodes', {story, story_node_id, user_id: user.user_id, date})
    await db.update({table: 'story_history', row: {success: true}, conditions: {columns: {story_id: event_id}}})
    return {results, rows, event_id, success: true}
  }

}

module.exports = runStoryNode