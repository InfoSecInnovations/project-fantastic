const { transaction } = require('../db')
const isBlocked = require('../inventory/isblocked')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')

const postInventoryRules = async (user, res, req, query, _, http_data) => {
  // TODO: user permissions?
  if (!HasRole(user, 'user')) return End(res)
  // TODO: what validations do we need here?
  const date = Date.now()
  const db = await transaction()
  const existing = await db.get({table: 'inventory_rules', columns: ['inventory_rule_id'], conditions: {columns: {rule_type: query.mode, category: query.category, data: http_data}}})
  if (!existing) await db.insert('inventory_rules', {rule_type: query.mode, category: query.category, data: http_data, user_id: user.user_id, date})
  const block_rules = await db.all({table: 'inventory_rules', conditions: {columns: {category: query.category, rule_type: 'block'}}}).then(res => res.map(rule => ({...rule, data: JSON.parse(rule.data)})))
  const allow_rules = await db.all({table: 'inventory_rules', conditions: {columns: {category: query.category, rule_type: 'allow'}}}).then(res => res.map(rule => ({...rule, data: JSON.parse(rule.data)})))
  const inventory_data = await db.all({table: 'inventory_data', conditions: {columns: {category: query.category}}})
  const allowed_items = []
  const blocked_items = []
  inventory_data.forEach(data => {
    if (isBlocked(JSON.parse(data.data), allow_rules, block_rules)) blocked_items.push(data)
    else allowed_items.push(data)
  })
  await db.update({table: 'inventory_data', row: {blocked: 0}, conditions: {columns: {inventory_data_id: allowed_items.map(v => v.inventory_data_id)}, compare: 'IN'}})
  await db.update({table: 'inventory_data', row: {blocked: 1}, conditions: {columns: {inventory_data_id: blocked_items.map(v => v.inventory_data_id)}, compare: 'IN'}})
  await db.close()
  res.end()
}

module.exports = postInventoryRules