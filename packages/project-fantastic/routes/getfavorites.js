const {all} = require('../db')

const getFavorites = (user, res, req) => {
  console.log('http request for favorites incoming...')
  all({table: 'favorites', columns: ['data_type', 'data_key'], conditions: {columns: {user_id: user.user_id}}})
  .then(favorites => {
    if (res.aborted) return
    res.end(JSON.stringify(favorites))
    console.log(`found ${favorites.length} favorites`)
  })
} 

module.exports = getFavorites