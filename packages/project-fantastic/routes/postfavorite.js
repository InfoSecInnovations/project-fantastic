const {transaction} = require('../db')

const postFavorite = async (user, res, req, query) => {
  const {data_type, data_key} = query
  const remove = query.remove == 'true' // query entries are always strings!
  console.log(`postFavorite: received http request to ${remove ? 'remove' : 'favorite'} ${data_type}: ${data_key}...`)
  const db = await transaction()
  if (remove) {
    await db.remove({table: 'favorites', conditions: {columns: {user_id: user.user_id, data_type, data_key}}})
  }
  else {
    const existing = await db.get({table: 'favorites', conditions: {columns: {user_id: user.user_id, data_type, data_key}}})
    if (!existing) await db.insert('favorites', {user_id: user.user_id, data_type, data_key})
  }
  await db.close()
  if (res.aborted) return
  res.end(JSON.stringify({data_type, data_key, remove}))
  console.log(`postFavorite: ${remove ? 'removed' : 'favorited'} ${data_type}: ${data_key}`)
}

module.exports = postFavorite