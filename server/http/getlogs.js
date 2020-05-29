const ValidateRole = require('./auth/validaterole')
const Abort = require('./abort')
const End = require('./end')
const ParseQuery = require('fantastic-utils/parsequery')
const {transaction} = require('../db')
const GetByID = require('./auth/getbyid')

const getLogs = (res, req) => {
  const header = req.getHeader('cookie')
  const query = ParseQuery(req.getQuery())
  Abort(res)
  ValidateRole(header, 'admin').then(async is_admin => {
    if (!is_admin) return End(res)
    const db = await transaction()
    const page = (query && query.page) || 0
    const count = (query && query.count) || 25
    const users = {}
    const rows = await db.all({
      table: 'all_history',
      order_by: {date: 'DESC'},
      limit: {offset: page * count, count}
    })
    const results = []
    for (const row of rows) {
      const result = await db.get({table: `${row.event_type}_history`, conditions: {columns: {[`${row.event_type}_id`]: row.event_id}}})
      const user = users[row.user_id] || await (users[row.user_id] = GetByID(row.user_id))
      if (result) results.push({...row, ...result, user})
    }
    db.close()
    if (res.aborted) return
    res.end(JSON.stringify(results))
  })
}

module.exports = getLogs