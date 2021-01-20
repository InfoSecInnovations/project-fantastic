const RunQuest = require('../quests/runquest')
const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const {transaction} = require('../db')

const postQuests = async (user, res, req, query, tests) => {
  console.log(`postQuests: received http request to start ${query.quest}...`)
  if (!tests.includes(query.quest)) return End(res)
  const test = await GetPackagedData(query.quest, 'tests')
  if (!HasRole(user, test.role)) return End(res)
  const date = Date.now()
  const db = await transaction()
  const result = await RunQuest(db, query.quest, user, date)
  await db.insert('all_history', {event_type: 'quest', event_id: result.event_id, date, user_id: user.user_id})
  await db.close()
  if (res.aborted) return
  res.end(JSON.stringify({result: result.results, test_id: result.test_id, rows: result.rows, date}))
  console.log(`postQuests: completed quest ${query.quest}, queried ${result.rows.length} nodes`)
}

module.exports = postQuests