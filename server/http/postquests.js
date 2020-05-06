const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunQuest = require('../quests/runquest')
const Auth = require('./auth')

const postActions = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to start ${query.quest}...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end() // TODO: validate required role for quest
    const date = Date.now()
    const result = await RunQuest(query.quest, user.user_id, date, query.date)
    if (res.aborted) return
    res.end(JSON.stringify({result, date}))
    console.log(`completed quest ${query.quest}, queried ${result.length} nodes`)
    console.log('-----------')
  })
}

module.exports = postActions