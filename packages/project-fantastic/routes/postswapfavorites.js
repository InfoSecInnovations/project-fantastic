const End = require('./end')
const {transaction} = require('../db')
const GetUserHistory = require('../db/getuserhistory')

const postSwapFavorites = async (user, res, req, query) => {
  console.log(`postSwapFavorites: received http request to swap favorites ${query.a} and ${query.b}...`)
  const db = await transaction()
  const sort_a = await db.get({table: 'favorites', conditions: {columns: {favorite_id: query.a, user_id: user.user_id}}}).then(row => row && row.sorting)
  const sort_b = await db.get({table: 'favorites', conditions: {columns: {favorite_id: query.b, user_id: user.user_id}}}).then(row => row && row.sorting)
  if (!sort_a || !sort_b) {
    await db.close()
    return End(res)
  }
  await db.update({table: 'favorites', row: {sorting: sort_b}, conditions: {columns: {favorite_id: query.a, user_id: user.user_id}}})
  await db.update({table: 'favorites', row: {sorting: sort_a}, conditions: {columns: {favorite_id: query.b, user_id: user.user_id}}})
  await db.close()
  const history = await GetUserHistory(user)
  if (res.aborted) return
  res.end(JSON.stringify(history))
  console.log(`postSwapFavorites: swapped favorites ${query.a} and ${query.b}.`)
}

module.exports = postSwapFavorites