const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunQuest = require('../quests/runquest')
const Auth = require('./auth')
const GetAsset = require('../util/getpackageddata')
const HasRole = require('fantastic-utils/hasrole')
const End = require('./end')

const postQuests = (res, req, tests) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to start ${query.quest}...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return End(res)
    if (!tests.includes(query.quest)) return End(res)
    const test = await GetAsset(query.quest)
    if (!HasRole(user, test.role)) return End(res)
    const date = Date.now()
    const result = await RunQuest(query.quest, user, date)
    if (res.aborted) return
    res.end(JSON.stringify({result: result.results, rows: result.rows, date}))
    console.log(`completed quest ${query.quest}, queried ${result.length} nodes`)
    console.log('-----------')
  })
}

module.exports = postQuests