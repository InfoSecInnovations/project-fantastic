const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunQuest = require('../quests/runquest')
const ValidateRole = require('./auth/validaterole')

const postActions = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to start ${query.quest}...`)
  ValidateRole(res, req, 'user') // TODO: validate required role for quest
  .then(valid => {
    if (!valid) return !res.aborted && res.end()
    const date = Date.now()
    RunQuest(query.quest, date, query.date)
    .then(result => {
      if (res.aborted) return
      res.end(JSON.stringify({result, date}))
      console.log(`completed quest ${query.quest}, queried ${result.length} nodes`)
      console.log('-----------')
    })
  })
}

module.exports = postActions