const DB = require('../db')
const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const ValidateRole = require('./auth/validaterole')

const getNodes = (res, req) => {
  res.onAborted(() => Abort(res))
  console.log('-----------')
  console.log('http request for nodes incoming...')
  const start = Date.now()
  const query = ParseQuery(req.getQuery())
  ValidateRole(req.getHeader('cookie'), 'user')
  .then(valid => {
    if (!valid) return !res.aborted && res.end()
    console.log(`from ${Math.floor((Date.now() - query.date) / 1000 / 60)} minutes ago`)
    console.log(`connection type: ${query.connection_type}`)
    console.log(`connection state: ${query.connection_state}`)
    console.log(`show external hosts: ${query.show_external}`)
    DB.getNodes(query).then(nodes => {
      if (res.aborted) return
      console.log(`got nodes from database in ${Date.now() - start}ms, returning results!`)
      console.log('-----------')
      res.end(JSON.stringify(nodes))
    })
  })
}

module.exports = getNodes