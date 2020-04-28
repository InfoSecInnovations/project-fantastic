const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunActionFunction = require('../actions/runactionfunction')
const ValidateRole = require('./auth/validaterole')

const postActions = (res, req, config) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to execute ${query.action} on node ${query.node_id}...`)
  ValidateRole(res, req, 'user') // TODO: validate required role for action
  .then(valid => {
    if (!valid) return !res.aborted && res.end()
    const date = Date.now()
    RunActionFunction(query.action, 'run', query.node_id, date)
    .then(result => {
      if (res.aborted) return
      res.end(JSON.stringify({result, date}))
      console.log(`${query.action} executed on node ${query.node_id}`)
      console.log('-----------')
    })
  })
}

module.exports = postActions