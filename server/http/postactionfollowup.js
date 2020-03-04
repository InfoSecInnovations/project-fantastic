const GetQuery = require('./getquery')
const GetAction = require('../util/getpackagedasset')
const Abort = require('./abort')

const postActionFollowup = (res, req) => {
  res.onAborted(() => Abort(res))
  const query = GetQuery(req)
  console.log('-----------')
  console.log(`received http request to execute ${query.function} function from ${query.action}${query.hostname ? ` on ${query.hostname}` : ''}...`)
  const action = GetAction(query.action)
  let buffer
  res.onData((data, isLast) => {
    let chunk = Buffer.from(data)
    buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])
    if (isLast) {
      const json = JSON.parse(buffer)
      action[query.function](query.hostname, json)
        .then(result => {
          if (res.aborted) return
          console.log(`${query.function} function from ${query.action} executed${query.hostname ? ` on ${query.hostname}` : ''}.`)
          console.log('-----------')
          res.end(JSON.stringify(result))
        })
    }
  })
}

module.exports = postActionFollowup