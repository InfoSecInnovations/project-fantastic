const { transaction } = require('../db')
const IsBlocked = require('@infosecinnovations/fantastic-utils/isblocked')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const refreshCategory = require('../inventory/refreshcategory')

const postInventoryRules = async (user, res, req, query, _, http_data) => {
  // TODO: user permissions?
  if (!HasRole(user, 'user')) return End(res)
  // TODO: what validations do we need here?
  const date = Date.now()
  const db = await transaction()
  const existing = await db.get({table: 'inventory_rules', columns: ['inventory_rule_id'], conditions: {columns: {rule_type: query.mode, category: query.category, data: http_data}}})
  if (!existing) await db.insert('inventory_rules', {rule_type: query.mode, category: query.category, data: http_data, user_id: user.user_id, date})
  const rules = await refreshCategory(db, query.category)
  await db.close()
  res.end(JSON.stringify({rules, category: query.category}))
}

module.exports = postInventoryRules