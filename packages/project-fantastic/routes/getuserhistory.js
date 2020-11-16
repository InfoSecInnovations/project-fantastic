const Abort = require('./abort')
const End = require('./end')
const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const Auth = require('./auth')
const GetUserHistory = require('../db/getuserhistory')

const getUserHistory = async (res, req) => {
  console.log('getUserHistory: received http request to get user history...')
  const header = req.getHeader('cookie')
  const query = ParseQuery(req.getQuery())
  Abort(res)
  Auth(header).then(async user => {
    if (!user) return End(res)
    const history = await GetUserHistory(user, query)
    if (res.aborted) return
    console.log(`getUserHistory: found ${history.results.length} records for user ${user.username}`)
    res.end(JSON.stringify(history))
  })
}

module.exports = getUserHistory