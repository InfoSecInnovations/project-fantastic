const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunActionFunction = require('../actions/runaction')
const HasRole = require('fantastic-utils/hasrole')
const Auth = require('./auth')
const GetAsset = require('../util/getpackagedfunction')

const postActions = (res, req, config) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to execute ${query.action} on node ${query.node_id}...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const action = await GetAsset(query.action)
    if (!HasRole(user, action.role)) return !res.aborted && res.end()
    const date = Date.now()
    RunActionFunction(query.action, 'run', query.node_id, user.user_id, date)
    .then(result => {
      if (res.aborted) return
      res.end(JSON.stringify({result, date}))
      console.log(`${query.action} executed on node ${query.node_id}`)
      console.log('-----------')
    })
  })
}

module.exports = postActions