const { all } = require('../db')
const Abort = require('./abort')
const Auth = require('./auth')

const getQuestHistory = (res, req) => {
  res.onAborted(() => Abort(res))
  const start = Date.now()
  console.log('-----------')
  console.log(`http request for quest history incoming...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const rows = await all({table: 'quest_history', conditions: {columns: {user_id: user.user_id}}})
    if (res.aborted) return
    console.log(`got quest history from database in ${Date.now() - start}ms, returning results!`)
    console.log('-----------')
    res.end(JSON.stringify(rows))
  })
}

module.exports = getQuestHistory