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
  const where_query = `
  WHERE user_id = ? AND event_type IN (?, ?, ?, ?, ?, ?) AND (
    event_type != "action" OR (SELECT COUNT(*) FROM action_history WHERE action_id == event_id AND function == "run") > 0
  )
  `
  const where_data = [
    user.user_id,
    'quest', 
    'scan', 
    'command', 
    'story', 
    'action',
    'selection'
  ]
  const rows = await db.sqlite(db => new Promise((resolve, reject) => {
    db.all(`
      SELECT history_id, event_type, event_id, date FROM all_history
      ${where_query} AND oid NOT IN (
        SELECT oid FROM all_history
        ${where_query}
        ORDER BY date DESC
        LIMIT ${count * page}
      )
      ORDER BY date DESC
      LIMIT ${count}
    `, [
      ...where_data,
      ...where_data
    ], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  }))
  const is_last = await db.sqlite(db => new Promise((resolve, reject) => {
    db.all(`
      SELECT history_id FROM all_history
      ${where_query} AND oid NOT IN (
        SELECT oid FROM all_history
        ${where_query}
        ORDER BY date DESC
        LIMIT ${count * page + 1}
      )
      ORDER BY date DESC
      LIMIT ${count}
    `, [
      ...where_data,
      ...where_data
    ], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })).then(rows => !rows.length)
  const results = await Promise.all(rows.map(row => GetData(db, row)))
  const saved = await GetSaved(db, user)
  await db.close()
  return {results, is_last, saved}
}

module.exports = getUserHistory