const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunQuest = require('../quests/runquest')
const Auth = require('./auth')
const GetAsset = require('../util/getpackagedfunction')
const HasRole = require('fantastic-utils/hasrole')

const postActions = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to start ${query.quest}...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const quest = await GetAsset(query.quest)
    const test = await GetAsset(quest.test)
    if (!HasRole(user, test.role)) return !res.aborted && res.end()
    const date = Date.now()
    const result = await RunQuest(query.quest, user, date, query.date)
    if (res.aborted) return
    res.end(JSON.stringify({result, date}))
    console.log(`completed quest ${query.quest}, queried ${result.length} nodes`)
    console.log('-----------')
  })
}

module.exports = postActions