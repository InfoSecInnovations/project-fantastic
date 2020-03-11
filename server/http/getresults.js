const { all } = require('../db/operations')
const GetQuery = require('./getquery')
const Abort = require('./abort')

const getResults = (res, req) => {
  res.onAborted(() => Abort(res))
  const start = Date.now()
  const query = GetQuery(req)
  console.log('-----------')
  console.log(`http request for results from node ${query.node_id} incoming...`)
  all({table: 'results', conditions: {columns: {node_id: query.node_id}}}).then(rows => {
    if (res.aborted) return
    console.log(`got results from node ${query.node_id} from database in ${Date.now() - start}ms, returning results!`)
    console.log('-----------')
    res.end(JSON.stringify(rows))
  })
}

module.exports = getResults