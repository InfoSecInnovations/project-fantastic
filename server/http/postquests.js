const GetQuery = require('./getquery')
const Abort = require('./abort')
const RunQuest = require('../quests/runquest')

const postActions = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = GetQuery(req)
  console.log('-----------')
  console.log(`received http request to start ${query.quest}...`)
  const date = Date.now()
  RunQuest(query.quest, date, query.date)
    .then(result => {
      if (res.aborted) return
      res.end(JSON.stringify({result, date}))
      console.log(`completed quest ${query.quest}, queried ${result.length} nodes`)
      console.log('-----------')
    })
}

module.exports = postActions