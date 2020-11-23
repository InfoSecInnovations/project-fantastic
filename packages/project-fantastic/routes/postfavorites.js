const End = require('./end')
const {transaction} = require('../db')
const GetUserHistory = require('../db/getuserhistory')
const GetUserFavorites = require('../db/getuserhistory/getuserfavorites')
const CompareEvent = require('@infosecinnovations/fantastic-utils/compareevent')
const GetData = require('../db/getuserhistory/getdata')

const postFavorites = async (user, res, req, query) => {
  const remove = query.remove == 'true' // query entries are always strings!
  console.log(`postFavorites: received http request to ${remove ? 'unfavorite' : 'favorite'} history item ${query.history_id}...`)
  const db = await transaction()
  // we need to compare the favorited event using the compare function otherwise the user could favorite 2 functionally identical events with different IDs
  const favorites = await GetUserFavorites(db, user)
  const selected = await db.get({table: 'all_history', conditions: {columns: {user_id: user.user_id, history_id: query.history_id}}})
  .then(row => GetData(db, [row]))
  .then(rows => rows[0])
  .catch(() => {})
  if (!selected) { // if we couldn't get this event from the history it's likely to be a bad request
    await db.close()
    return End(res)
  }
  const existing = favorites.find(v => CompareEvent(v, selected))
  if (remove) {
    if (existing) await db.remove({table: 'favorites', conditions: {columns: {user_id: user.user_id, history_id: existing.history_id}}})
  }
  else {
    if (!existing) {
      const max_sort = await db.get({table: 'favorites', columns: ['MAX(sorting) AS sorting'], conditions: {columns: {user_id: user.user_id}}}).then(row => (row && row.sorting) || 0)
      await db.insert('favorites', {user_id: user.user_id, history_id: query.history_id, sorting: max_sort + 1})
    }
  }
  await db.close()
  const history = await GetUserHistory(user)
  if (res.aborted) return
  res.end(JSON.stringify(history))
  console.log(`postFavorites: ${remove ? 'unfavorited' : 'favorited'} history item ${query.history_id}`)
}

module.exports = postFavorites