const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const RunActionFunction = require('../actions/runactionfunction')

const postActionFollowup = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`received http request to execute ${query.function} function from ${query.action} on node ${query.node_id}...`)
  const date = Date.now()
  let buffer
  res.onData((data, isLast) => {
    let chunk = Buffer.from(data)
    buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])
    if (isLast) {
      const json = JSON.parse(buffer)
      RunActionFunction(query.action, query.function, query.node_id, date, json, query.key)
        .then(result => {
          if (res.aborted) return
          console.log(`${query.function} function from ${query.action} executed on node ${query.node_id}.`)
          console.log('-----------')
          res.end(JSON.stringify({result, date}))
        })
    }
  })
}

module.exports = postActionFollowup