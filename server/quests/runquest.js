const GetAsset = require('../util/getpackageddata')
const RunTest = require('../tests/runtest')
const UpdateHistory = require('./updatehistory')

const runQuest = async (quest, user, date, min_date) => {
  const test_obj = await GetAsset(quest)
  const results = await RunTest(quest, user, date, min_date, test_obj.quest.parameters)
  await UpdateHistory(quest, user.user_id, date, results)
  return results
}

module.exports = runQuest