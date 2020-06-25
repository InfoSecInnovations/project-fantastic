const GetAsset = require('../util/getpackageddata')
const RunTest = require('../tests/runtest')
const UpdateHistory = require('./updatehistory')
const {getNodes} = require('../db')

const convert_time = time => (time && (time.d || 0) * 1000 * 60 * 60 * 24 + (time.h || 0) * 1000 * 60 * 60 + (time.m || 0) * 1000 * 60 + (time.s ||0) * 1000) || 0

const runQuest = async (quest, user, date) => {
  const test_obj = await GetAsset(quest)
  const rows = await getNodes({date: Date.now() - convert_time(test_obj.quest.selection.age)})
  const results = await RunTest(quest, user, date, rows.map(v => v.node_id), test_obj.quest.parameters)
  UpdateHistory(quest, user.user_id, date, results)
  return {results, rows}
}

module.exports = runQuest