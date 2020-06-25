const GetAsset = require('../util/getpackageddata')
const RunTest = require('../tests/runtest')
const UpdateHistory = require('./updatehistory')
const {getNodes} = require('../db')
const ConvertTime = require('fantastic-utils/converttime')

const runQuest = async (quest, user, date) => {
  const test_obj = await GetAsset(quest)
  const rows = await getNodes({date: Date.now() - ConvertTime(test_obj.quest.selection.age)})
  const row_ids = rows.map(v => v.node_id)
  const results = await RunTest(quest, user, date, row_ids, test_obj.quest.parameters)
  UpdateHistory(quest, user.user_id, date, results, row_ids)
  return {results, rows}
}

module.exports = runQuest