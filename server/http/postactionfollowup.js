const GetQuery = require('./getquery')

const postActionFollowup = (res, req) => {
  res.onAborted()
  const query = GetQuery(req)
  console.log('-----------')
  console.log(`received http request to execute ${query.function} function from ${query.action}${query.hostname ? ` on ${query.hostname}` : ''}...`)
  const action = require(`../config/actions/${query.action}`)
  let buffer
  res.onData((data, isLast) => {
    let chunk = Buffer.from(data)
    buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])
    if (isLast) {
      const json = JSON.parse(buffer)
      action[query.function](query.hostname, json) // TODO: hostname
        .then(result => res.end(JSON.stringify(result)))
      console.log(`${query.function} function from ${query.action} executed${query.hostname ? ` on ${query.hostname}` : ''}.`)
      console.log('-----------')
    }
  })
}

module.exports = postActionFollowup