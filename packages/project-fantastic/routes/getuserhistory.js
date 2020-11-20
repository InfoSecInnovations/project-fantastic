const GetUserHistory = require('../db/getuserhistory')

const getUserHistory = (user, res, req, query) => {
  console.log('getUserHistory: received http request to get user history...')
  GetUserHistory(user, query)
  .then(history => {
    if (res.aborted) return
    console.log(`getUserHistory: found ${history.results.length} records for user ${user.username}`)
    res.end(JSON.stringify(history))
  })
}

module.exports = getUserHistory