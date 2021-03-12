const RunScan = require('../scans/runscan')
const GetPackagedData = require('../util/getpackageddata')
const End = require('./end')
const {transaction} = require('../db')
const RunAction = require('../actions/runaction')
const getAbsoluteDataPath = require('../util/getabsolutedatapath')
const RunQuest = require('../quests/runquest')
const RunStoryNode = require('../stories/runstorynode')

const postScanResolve = async (user, res, req, query) => {
  console.log(`postScanResolve: received http request to resolve scan history item ${query.scan_id}...`)

  const date = Date.now()
  try {
    const db = await transaction()
    const currentResult = await db.get({table: 'scan_history', columns: ['results', 'parameters', 'scan', 'quest_id', 'story_id', 'age'], conditions: {columns: {scan_id: query.scan_id}}})
    const scan = currentResult.scan
    const scan_obj = await GetPackagedData(scan, 'scans')
    const results = JSON.parse(currentResult.results)
    const failed = results.filter(row => row.result != scan_obj.pass.condition).map(row => row.node_id)
    await Promise.all(failed.map(row => RunAction(
      db, 
      getAbsoluteDataPath(scan_obj.pass.failure.action.path, scan),
      scan_obj.pass.failure.action.function || 'run',
      row,
      user,
      date,
      { data: scan_obj.pass.failure.action.data }
    )))
    const complete = async data => {
      await db.close()
      if (res.aborted) return
      console.log(`postScanResolve: resolved scan history item ${query.scan_id}.`)
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
        scan_id: result.scan_id, 
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
        scan_id: result.scan_id
      })
    }
    // TODO: role check
    const result = await RunScan(db, scan, user, date, results.map(row => row.node_id), JSON.parse(currentResult.parameters), currentResult.age)
    await db.insert('all_history', {event_type: 'scan', event_id: result.event_id, user_id: user.user_id, date})
    return complete({result: result.results, date, data_type: 'scans', data_key: scan, scan_id: result.scan_id, parameters: currentResult.parameters, age: currentResult.age})
  }
  catch(err) {
    return End(res)
  }
}

module.exports = postScanResolve