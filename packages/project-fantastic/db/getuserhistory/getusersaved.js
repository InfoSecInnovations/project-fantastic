const GetData = require('./getdata')

/**
 * 
 * @param {import('@infosecinnovations/fantastic-db/types').Operations} db 
 * @param {import('@infosecinnovations/fantastic-utils/types').User} user 
 */
const getSaved = (db, user) => db.all({table: 'saved', conditions: {columns: {user_id: user.user_id}}, order_by: 'sorting'})
  .then(rows => Promise.all(rows.map(v => db.get({table: 'all_history', conditions: {columns: {history_id: v.history_id}}}).then(row => ({...v, ...row})))))
  .then(rows => Promise.all(rows.map(row => GetData(db, row))))

module.exports = getSaved