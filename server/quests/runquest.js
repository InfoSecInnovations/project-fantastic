const GetQuest = require('../util/getpackagedasset')
const RunTest = require('../tests/runtest')
const UpdateHistory = require('./updatehistory')

const runQuest = async (quest, user_id, date, min_date) => {
  const quest_obj = GetQuest(quest)
  const results = await RunTest(quest_obj.test, user_id, date, min_date, quest_obj.parameters)
  await UpdateHistory(quest, user_id, date, results)
  return results
}

module.exports = runQuest