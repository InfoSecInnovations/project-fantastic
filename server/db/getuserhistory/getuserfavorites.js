const GetData = require('./getdata')

const getFavorites = (db, user) => db.all({table: 'favorites', user_id: user.user_id})
  .then(rows => db.all({table: 'all_history', conditions: {columns: {history_id: rows.map(v => v.history_id)}, compare: 'IN'}}))
  .then(rows => GetData(db, rows))

module.exports = getFavorites