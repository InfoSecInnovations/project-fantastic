const GetQuery = require('./getquery')
const GetAction = require('../util/getpackagedasset')

const postActions = (res, req) => {
  res.onAborted()
  const query = GetQuery(req)
  console.log('-----------')
  console.log(`received http request to execute ${query.action}${query.hostname ? ` on ${query.hostname}` : ''}...`)
  const action = GetAction(query.action)
  action.run(query.hostname) // TODO: hostname
    .then(result => {
      res.end(JSON.stringify(result))
      console.log(`${query.action} executed${query.hostname ? ` on ${query.hostname}` : ''}.`)
      console.log('-----------')
    })
}

module.exports = postActions