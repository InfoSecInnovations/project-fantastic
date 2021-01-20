const RunTest = require('../tests/runtest')
const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const {transaction} = require('../db')
const RunAction = require('../actions/runaction')
const getAbsoluteDataPath = require('../util/getabsolutedatapath')
const RunQuest = require('../quests/runquest')
const RunStoryNode = require('../stories/runstorynode')

const postTestResolve = async (user, res, req, query) => {
  console.log(`postTestResolve: received http request to resolve test history item ${query.test_id}...`)

  const date = Date.now()
  try {
    const db = await transaction()
    const currentResult = await db.get({table: 'test_history', columns: ['results', 'parameters', 'test', 'quest_id', 'story_id'], conditions: {columns: {test_id: query.test_id}}})
    const test = currentResult.test
    const test_obj = await GetPackagedData(test, 'tests')
    const results = JSON.parse(currentResult.results)
    const failed = results.filter(row => row.result != test_obj.pass.condition).map(row => row.node_id)
    await Promise.all(failed.map(row => RunAction(
      db, 
      getAbsoluteDataPath(test_obj.pass.failure.action.path, test),
      test_obj.pass.failure.action.function || 'run',
      row,
      user,
      date,
      { data: test_obj.pass.failure.action.data }
    )))
    const complete = async data => {
      await db.close()
      if (res.aborted) return
      console.log(`postTestResolve: resolved test history item ${query.test_id}.`)
      res.end(JSON.stringify(data))
    }
    if (currentResult.quest_id) {
      // TODO: role check
      const quest_history = await db.get({table: 'quest_history', conditions: {columns: {quest_id: currentResult.quest_id}}})
      const result = await RunQuest(
        db,
        quest_history.quest,
        user,
        date
      )
      await db.insert('all_history', {event_type: 'quest', event_id: result.event_id, user_id: user.user_id, date})
      return complete({
        result: result.results, 
        test_id: result.test_id, 
        rows: result.rows, 
        date, 
        data_type: 'quests', 
        data_key: quest_history.quest
      })
    }
    if (currentResult.story_id) {
      // TODO: role check
      const story_history = await db.get({table: 'story_history', conditions: {columns: {story_id: currentResult.story_id}}})
      const result = await RunStoryNode(
        db,
        story_history.story,
        story_history.story_node_id,
        user,
        date
      )
      await db.insert('all_history', {event_type: 'story', event_id: result.event_id, user_id: user.user_id, date})
      return complete({
        result: result.results, 
        rows: result.rows, date, success: 
        result.success, data_type: 'stories', 
        data_key: story_history.story, 
        story_node: story_history.story_node_id,
        test_id: result.test_id
      })
    }
    // TODO: role check
    const result = await RunTest(db, test, user, date, results.map(row => row.node_id), JSON.parse(currentResult.parameters))
    await db.insert('all_history', {event_type: 'test', event_id: result.event_id, user_id: user.user_id, date})
    return complete({result: result.results, date, data_type: 'tests', data_key: test, test_id: result.test_id, parameters: currentResult.parameters})
  }
  catch(err) {
    return End(res)
  }
}

module.exports = postTestResolve