const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunActionFunction = require('../actions/runactionfunction')
const Auth = require('./auth')

const postActions = (res, req, config) => {
  res.onAborted(() => Abort(res))
  const {role} = Auth(res, req, config)
  if (role !== 'user' && role !== 'admin') return res.end('')
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to execute ${query.action} on node ${query.node_id}...`)
  const date = Date.now()
  RunActionFunction(query.action, 'run', query.node_id, date)
    .then(result => {
      if (res.aborted) return
      res.end(JSON.stringify({result, date}))
      console.log(`${query.action} executed on node ${query.node_id}`)
      console.log('-----------')
    })
}

module.exports = postActions