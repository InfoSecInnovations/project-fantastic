const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunActionFunction = require('../actions/runactionfunction')
const HasRole = require('fantastic-utils/hasrole')
const Auth = require('./auth')
const GetHTTPData = require('fantastic-utils/gethttpdata')
const GetAsset = require('../util/getpackagedasset')

const postActionFollowup = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  const header = req.getHeader('cookie')
  console.log('-----------')
  console.log(`received http request to execute ${query.function} function from ${query.action} on node ${query.node_id}...`)
  GetHTTPData(res)
  .then(async data => {
    const user = await Auth(header)
    if (!user) return !res.aborted && res.end()
    const action = await GetAsset(query.action)
    if (!HasRole(user, action.role)) return !res.aborted && res.end()
    const date = Date.now()
    const json = JSON.parse(data)
    const result = await RunActionFunction(query.action, query.function, query.node_id, user.user_id, date, json, query.key)
    if (res.aborted) return
    console.log(`${query.function} function from ${query.action} executed on node ${query.node_id}.`)
    console.log('-----------')
    res.end(JSON.stringify({result, date}))
  })
}

module.exports = postActionFollowup