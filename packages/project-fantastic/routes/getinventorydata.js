const DB = require('../db')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')

const getInventoryData = (user, res, req, query) => {
  console.log('getInventoryData: http request for inventory data incoming...')
  const start = Date.now()
  const date = query.date || 0
  if (!HasRole(user, 'user')) return End(res)
  if (!query.nodes || !query.nodes.length) {
    console.log('getInventoryData: no nodes were supplied!')
    return End(res)
  }
  console.log(`getInventoryData: from ${Math.round((Date.now() - date) / 1000 / 60)} minutes ago`)
  DB.getInventoryData({...query, date}).then(data => {
    if (res.aborted) return
    console.log(`getInventoryData: got inventory data from database in ${Date.now() - start}ms, returning results!`)
    res.end(JSON.stringify(data))
  })
}

module.exports = getInventoryData