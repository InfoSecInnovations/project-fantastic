const { all } = require('../db')
const Abort = require('./abort')
const Auth = require('./auth')

const getQuestHistory = (res, req) => {
  Abort(res)
  const start = Date.now()
  console.log('-----------')
  console.log(`http request for quest history incoming...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const rows = await all({
      table: 'quest_history',
      columns: ['MAX(date)', 'quest', 'results', 'rows'], 
      conditions: {columns: {user_id: user.user_id}},
      group_by: ['quest']
    })
    if (res.aborted) return
    console.log(`got quest history from database in ${Date.now() - start}ms, returning results!`)
    console.log('-----------')
    res.end(JSON.stringify(rows.map(v => ({...v, date: v['MAX(date)']}))))
  })
}

module.exports = getQuestHistory