const RunQuest = require('../quests/runquest')
const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const {transaction} = require('../db')
const GetActiveQuests = require('../db/getactivequests')

const postQuests = async (user, res, req, query, scans) => {
  console.log(`postQuests: received http request to start ${query.quest}...`)
  if (!scans.includes(query.quest)) return End(res)
  const scan = await GetPackagedData(query.quest, 'scans')
  if (!HasRole(user, scan.role)) return End(res)
  const db = await transaction()
  const active = await GetActiveQuests(db, user)
  const match = active.find(active => active.quest == query.quest)
  if (!match || match.date_completed) return End(res)
  const date = Date.now()
  const result = await RunQuest(db, query.quest, user, date)
  await db.insert('all_history', {event_type: 'quest', event_id: result.event_id, date, user_id: user.user_id})
  //TODO: GetData to generate history item
  await db.close()
  if (res.aborted) return
  res.end(JSON.stringify({result: result.results, parameters: result.parameters, scan_id: result.scan_id, rows: result.rows, date, success: result.success}))
  console.log(`postQuests: completed quest ${query.quest}, queried ${result.rows.length} nodes`)
}

module.exports = postQuests