const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunAction = require('../actions/runaction')
const HasRole = require('fantastic-utils/hasrole')
const Auth = require('./auth')
const GetHTTPData = require('fantastic-utils/gethttpdata')
const GetAsset = require('../util/getpackageddata')
const End = require('./end')

const postActionFollowup = (res, req, actions) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  const header = req.getHeader('cookie')
  console.log('-----------')
  console.log(`received http request to execute ${query.function} function from ${query.action} on node ${query.node_id}...`)
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
      const result = await RunAction(query.action, query.function, query.node_id, user, date, json, query.label)
      if (res.aborted) return
      console.log(`${query.function} function from ${query.action} executed on node ${query.node_id}.`)
      console.log('-----------')
      res.end(JSON.stringify({result, date}))
    }
    catch (err) {
      return End(res)
    }
  })
}

module.exports = postActionFollowup