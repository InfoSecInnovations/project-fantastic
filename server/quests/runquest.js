const GetQuest = require('../util/getpackagedasset')
const RunTest = require('../tests/runtest')
const UpdateHistory = require('./updatehistory')

const runQuest = async (quest, date, min_date) => {
  const quest_obj = GetQuest(quest)
  const results = await RunTest(quest_obj.test, date, min_date, quest_obj.parameters)
  await UpdateHistory(quest, date, results)
  return results
}

module.exports = runQuest