const GetPackagedData = require('../util/getpackageddata')
const RunTest = require('../tests/runtest')
const {getNodes} = require('../db')
const ConvertTime = require('@infosecinnovations/fantastic-utils/converttime')

/**
 * Run a quest
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {string} quest 
 * @param {import('@infosecinnovations/fantastic-utils/types').User} user 
 * @param {number} date 
 */
const runQuest = async (db, quest, user, date) => {
  const test_obj = await GetPackagedData(quest, 'tests')
  const age = ConvertTime(test_obj.quest.selection.age)
  const rows = await getNodes({date: age && Date.now() - age, access: test_obj.hosts})
  const row_ids = rows.map(v => v.node_id)
  const event_id = await db.insert('quest_history', {quest, date, user_id: user.user_id, rows: JSON.stringify(row_ids)})
  const results = (await RunTest(db, quest, user, date, row_ids, test_obj.quest.parameters, event_id)).results
  return {results, rows, event_id}
}

module.exports = runQuest