const {transaction, OPEN_READONLY} = require('../operations')
const GetData = require('./getdata')
const GetSaved = require('./getusersaved')

/**
 * 
 * @param {import('@infosecinnovations/fantastic-utils/types').User} user 
 * @param {{page?: number, count?: number}} [options] 
 */
const getUserHistory = async (user, options) => {
  const db = await transaction(OPEN_READONLY)
  const page = (options && options.page) || 0
  const count = (options && options.count) || 25
  const conditions = {groups: [
    {columns: {user_id: user.user_id}},
    {columns: {event_type: ['quest', 'scan', 'command', 'story']}, compare: 'IN'}
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
  const results = await GetData(db, rows)
  const saved = await GetSaved(db, user)
  await db.close()
  return {results, is_last, saved}
}

module.exports = getUserHistory