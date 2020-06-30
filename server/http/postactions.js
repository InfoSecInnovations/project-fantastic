const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunAction = require('../actions/runaction')
const HasRole = require('fantastic-utils/hasrole')
const Auth = require('./auth')
const GetAsset = require('../util/getpackageddata')
const End = require('./end')

const postActions = (res, req, actions) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  console.log(`postActions: received http request to execute ${query.action} on node ${query.node_id}...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return End(res)
    if (!actions.includes(query.action)) return End(res)
    const action = await GetAsset(query.action)
    if (!HasRole(user, action.role)) return End(res)
    const date = Date.now()
    RunAction(query.action, 'run', query.node_id, user, date)
    .then(result => {
      if (res.aborted) return
      res.end(JSON.stringify({result, date}))
      console.log(`postActions: ${query.action} executed on node ${query.node_id}`)
    })
  })
}

module.exports = postActions