const DB = require('../db')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')

const getInventoryRules = (user, res, req) => {
  console.log('getInventoryRules: http request for inventory rules incoming...')
  const start = Date.now()
  if (!HasRole(user, 'user')) return End(res)
  DB.all({table: 'inventory_rules', columns: ['category', 'data', 'rule_type', 'inventory_rule_id']}).then(rules => {
    if (res.aborted) return
    console.log(`getInventoryRules: got inventory rules from database in ${Date.now() - start}ms, returning rules!`)
    res.end(JSON.stringify(rules))
  })
}

module.exports = getInventoryRules