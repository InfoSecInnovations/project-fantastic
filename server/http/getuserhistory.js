const Abort = require('./abort')
const End = require('./end')
const ParseQuery = require('fantastic-utils/parsequery')
const {transaction, OPEN_READONLY} = require('../db')
const Auth = require('./auth')

const getUserHistory = (res, req) => {
  console.log('getUserHistory: received http request to get user history...')
  const header = req.getHeader('cookie')
  const query = ParseQuery(req.getQuery())
  Abort(res)
  Auth(header).then(async user => {
    if (!user) return End(res)
    const db = await transaction(OPEN_READONLY)
    const page = (query && query.page) || 0
    const count = (query && query.count) || 25
    const conditions = {groups: [
      {columns: {user_id: user.user_id}},
      {columns: {event_type: ['quest', 'test', 'command']}, compare: 'IN'}
    ]}
    const rows = await db.all({
      table: 'all_history',
      order_by: {date: 'DESC'},
      conditions,
      pagination: {page_size: count, page}
    })
    const is_last = rows.length < count || await db.all({
      table: 'all_history',
      columns: ['history_id'],
      order_by: {date: 'DESC'},
      conditions,
      pagination: {page_size: count, page: page + 1}
    }).then(rows => !rows.length)
    const results = []
    for (const row of rows) {
      const result = await db.get({table: `${row.event_type}_history`, conditions: {columns: {[`${row.event_type}_id`]: row.event_id}}})
      if (result) results.push({...row, ...result})
    }
    db.close()
    if (res.aborted) return
    // TODO: retrieve favourites
    console.log(`getUserHistory: found ${results.length} records for user ${user.username}`)
    res.end(JSON.stringify({results, is_last}))
  })
}

module.exports = getUserHistory