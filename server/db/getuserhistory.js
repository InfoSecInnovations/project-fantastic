const {transaction, OPEN_READONLY} = require('./operations')

const get_data = async (db, rows) => {
  const results = []
  for (const row of rows) {
    const result = await db.get({table: `${row.event_type}_history`, conditions: {columns: {[`${row.event_type}_id`]: row.event_id}}})
    if (result) results.push({...row, ...result})
  }
  return results
}

const getUserHistory = async (user, options) => {
  const db = await transaction(OPEN_READONLY)
  const page = (options && options.page) || 0
  const count = (options && options.count) || 25
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
  const results = await get_data(db, rows)
  const favorites = await db.all({table: 'favorites', user_id: user.user_id})
  .then(rows => db.all({table: 'all_history', conditions: {columns: {history_id: rows.map(v => v.history_id)}, compare: 'IN'}}))
  .then(rows => get_data(db, rows))
  await db.close()
  return {results, is_last, favorites}
}

module.exports = getUserHistory