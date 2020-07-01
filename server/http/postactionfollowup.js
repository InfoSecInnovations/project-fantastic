const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunAction = require('../actions/runaction')
const HasRole = require('fantastic-utils/hasrole')
const Auth = require('./auth')
const GetHTTPData = require('fantastic-utils/gethttpdata')
const GetAsset = require('../util/getpackageddata')
const End = require('./end')
const {transaction} = require('../db')

const postActionFollowup = (res, req, actions) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  const header = req.getHeader('cookie')
  console.log(`postActionFollowup: received http request to execute ${query.function} function from ${query.action} on node ${query.node_id}...`)
  GetHTTPData(res)
  .then(async data => {
    const user = await Auth(header)
    if (!user) return End(res)
    if (!actions.includes(query.action)) return End(res)
    const action = await GetAsset(query.action)
    if (!HasRole(user, action.role)) return End(res)
    const func = action.functions[query.function]
    if (!func) return End(res)
    if (func.role && !HasRole(user, func.role)) return End(res)
    const date = Date.now()
    try {
      const json = JSON.parse(data)
      const db = await transaction()
      const result = await RunAction(db, query.action, query.function, query.node_id, user, date, {label: query.label, data: json})
      await db.insert('all_history', {event_type: 'action', event_id: result.event_id, date, user_id: user.user_id})
      await db.close()
      if (res.aborted) return
      console.log(`postActionFollowup: ${query.function} function from ${query.action} executed on node ${query.node_id}.`)
      res.end(JSON.stringify({result: result.result, date}))
    }
    catch (err) {
      return End(res)
    }
  })
}

module.exports = postActionFollowup