const GetQuery = require('./getquery')

const postActions = (res, req) => {
  res.onAborted()
  const query = GetQuery(req)
  console.log('-----------')
  console.log(`received http request to execute ${query.action} action...`)
  const action = require(`../config/actions/${query.action}`)
  action.run() // TODO: hostname
    .then(result => {
      res.end(JSON.stringify(result))
      console.log('-----------')
    })
}

module.exports = postActions