const { all } = require('../db')
const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const Auth = require('./auth')

const getResults = (res, req) => {
  res.onAborted(() => Abort(res))
  const start = Date.now()
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log(`http request for results from node ${query.node_id} incoming...`)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const rows = await all({table: 'results', conditions: {columns: {node_id: query.node_id, user_id: user.user_id}}})
    if (res.aborted) return
    console.log(`got results from node ${query.node_id} from database in ${Date.now() - start}ms, returning results!`)
    console.log('-----------')
    res.end(JSON.stringify(rows))
  })
}

module.exports = getResults