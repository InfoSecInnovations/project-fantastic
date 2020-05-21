const GetQuest = require('../util/getpackagedfunction')
const RunTest = require('../tests/runtest')
const UpdateHistory = require('./updatehistory')

const runQuest = async (quest, user, date, min_date) => {
  const quest_obj = await GetQuest(quest)
  const results = await RunTest(quest_obj.test, user, date, min_date, quest_obj.parameters)
  await UpdateHistory(quest, user.user_id, date, results)
  return results
}

module.exports = runQuest