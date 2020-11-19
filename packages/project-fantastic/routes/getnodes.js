const DB = require('../db')
const ParseQuery = require('@infosecinnovations/fantastic-utils/parsequery')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')

const getNodes = (user, res, req) => {
  console.log('getNodes: http request for nodes incoming...')
  const start = Date.now()
  const query = ParseQuery(req.getQuery())
  if (!HasRole(user, 'user')) return End(res)
  console.log(`getNodes: from ${Math.floor((Date.now() - query.date) / 1000 / 60)} minutes ago`)
  console.log(`getNodes: connection type: ${query.connection_type}`)
  console.log(`getNodes: connection state: ${query.connection_state}`)
  console.log(`getNodes: show external hosts: ${query.show_external}`)
  DB.getNodes(query).then(nodes => {
    if (res.aborted) return
    console.log(`getNodes: got nodes from database in ${Date.now() - start}ms, returning results!`)
    res.end(JSON.stringify(nodes))
  })
}

module.exports = getNodes