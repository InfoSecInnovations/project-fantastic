const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const Auth = require('./auth')
const End = require('./end')
const {transaction} = require('../db')
const GetUserHistory = require('../db/getuserhistory')

const postFavourites = (res, req) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  const remove = query.remove == 'true' // query entries are always strings!
  console.log(`postFavourites: received http request to ${remove ? 'unfavorite' : 'favorite'} history item ${query.history_id}...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return End(res)
    const db = await transaction()
    if (remove) await db.remove({table: 'favorites', conditions: {columns: {user_id: user.user_id, history_id: query.history_id}}})
    else {
      const existing = await db.get({table: 'favorites', columns: ['favorite_id'], conditions: {columns: {user_id: user.user_id, history_id: query.history_id}}})
      if (!existing) await db.insert('favorites', {user_id: user.user_id, history_id: query.history_id})
    }
    await db.close()
    const history = await GetUserHistory(user)
    res.end(JSON.stringify(history))
    console.log(`postFavourites: ${remove ? 'unfavorited' : 'favorited'} history item ${query.history_id}`)
  })
}

module.exports = postFavourites