const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunQuest = require('../quests/runquest')
const Auth = require('./auth')
const GetAsset = require('../util/getpackageddata')
const HasRole = require('fantastic-utils/hasrole')
const End = require('./end')
const {transaction} = require('../db')

const postQuests = (res, req, tests) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  console.log(`postQuests: received http request to start ${query.quest}...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return End(res)
    if (!tests.includes(query.quest)) return End(res)
    const test = await GetAsset(query.quest)
    if (!HasRole(user, test.role)) return End(res)
    const date = Date.now()
    const db = await transaction()
    const result = await RunQuest(db, query.quest, user, date)
    await db.insert('all_history', {event_type: 'quest', event_id: result.event_id, date, user_id: user.user_id})
    await db.close()
    if (res.aborted) return
    res.end(JSON.stringify({result: result.results, rows: result.rows, date}))
    console.log(`postQuests: completed quest ${query.quest}, queried ${result.rows.length} nodes`)
  })
}

module.exports = postQuests