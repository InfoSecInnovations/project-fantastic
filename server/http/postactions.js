const GetQuery = require('./getquery')
const Abort = require('./abort')
const RunActionFunction = require('../actions/runactionfunction')

const postActions = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = GetQuery(req)
  console.log('-----------')
  console.log(`received http request to execute ${query.action} on node ${query.node_id}...`)
  RunActionFunction(query.action, 'run', query.node_id)
    .then(result => {
      if (res.aborted) return
      res.end(JSON.stringify(result))
      console.log(`${query.action} executed on node ${query.node_id}`)
      console.log('-----------')
    })
}

module.exports = postActions