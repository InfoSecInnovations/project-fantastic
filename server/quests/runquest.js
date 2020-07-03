const GetAsset = require('../util/getpackageddata')
const RunTest = require('../tests/runtest')
const {getNodes} = require('../db')
const ConvertTime = require('fantastic-utils/converttime')

const runQuest = async (db, quest, user, date) => {
  const test_obj = await GetAsset(quest)
  const rows = await getNodes({date: Date.now() - ConvertTime(test_obj.quest.selection.age)})
  const row_ids = rows.map(v => v.node_id)
  const event_id = await db.insert('quest_history', {quest, date, user_id: user.user_id, rows: JSON.stringify(row_ids)})
  const results = (await RunTest(db, quest, user, date, row_ids, test_obj.quest.parameters, event_id)).results
  await db.update({table: 'quest_history', row: {results: JSON.stringify(results)}, conditions: {columns: {quest_id: event_id}}})
  return {results, rows, event_id}
}

module.exports = runQuest