const { all } = require('../db')

const getResults = (user, res, req, query) => {
  const start = Date.now()
  console.log(`getResults: http request for results from ${query.nodes.length} nodes incoming...`)
  all({
    table: 'action_history', 
    columns: ['MAX(date) AS date', 'action', 'function', 'label', 'node_id', 'data', 'result', 'filter'],
    conditions: {groups: [{columns: {node_id: query.nodes}, compare: 'IN'}, {columns: {user_id: user.user_id}}]},
    group_by: ['action', 'function', 'label', 'node_id']
  })
  .then( rows => {
    if (res.aborted) return
    console.log(`getResults: got results from ${query.nodes.length} nodes from database in ${Date.now() - start}ms, returning results!`)
    res.end(JSON.stringify(rows))
  })
}

module.exports = getResults