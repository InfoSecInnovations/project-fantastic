const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunActionFunction = require('../actions/runactionfunction')
const HasRole = require('./auth/hasrole')
const Auth = require('./auth')

const postActions = (res, req, config) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to execute ${query.action} on node ${query.node_id}...`)
  Auth(req.getHeader('cookie'))
  .then(user => {
    if (!user || !HasRole(user, 'user')) return !res.aborted && res.end() // TODO: check role specific to action
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