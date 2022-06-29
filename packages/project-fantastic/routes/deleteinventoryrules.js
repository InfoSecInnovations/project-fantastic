const { transaction } = require('../db')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')
const RefreshCategory = require('../inventory/refreshcategory')

const deleteInventoryRules = async (user, res, req, query) => {
  // TODO: user permissions?
  if (!HasRole(user, 'user')) return End(res)
  // TODO: what validations do we need here?
  const db = await transaction()
  const rule = await db.get({table: 'inventory_rules', columns: [], conditions: {columns: {inventory_rule_id: query.rule_id}}})
  if (!rule) return End(res)
  const category = rule.category
  await db.remove({table: 'inventory_rules', conditions: {columns: {inventory_rule_id: rule.inventory_rule_id}}})
  const rules = await RefreshCategory(db, category)
  await db.close()
  res.end(JSON.stringify({rules, category}))
}

module.exports = deleteInventoryRules