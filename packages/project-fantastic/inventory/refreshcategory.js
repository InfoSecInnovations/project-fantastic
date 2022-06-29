const IsBlocked = require("@infosecinnovations/fantastic-utils/isblocked")

const refreshCategory = async (db, category) => {
  const block_rules = await db.all({table: 'inventory_rules', columns: ['category', 'data', 'rule_type', 'inventory_rule_id'], conditions: {columns: {category, rule_type: 'block'}}}).then(res => res.map(rule => ({...rule, data: JSON.parse(rule.data)})))
  const allow_rules = await db.all({table: 'inventory_rules', columns: ['category', 'data', 'rule_type', 'inventory_rule_id'], conditions: {columns: {category, rule_type: 'allow'}}}).then(res => res.map(rule => ({...rule, data: JSON.parse(rule.data)})))
  const inventory_data = await db.all({table: 'inventory_data', conditions: {columns: {category}}})
  const allowed_items = []
  const blocked_items = []
  inventory_data.forEach(data => {
    if (IsBlocked(JSON.parse(data.data), allow_rules, block_rules)) blocked_items.push(data)
    else allowed_items.push(data)
  })
  await db.update({table: 'inventory_data', row: {blocked: 0}, conditions: {columns: {inventory_data_id: allowed_items.map(v => v.inventory_data_id)}, compare: 'IN'}})
  await db.update({table: 'inventory_data', row: {blocked: 1}, conditions: {columns: {inventory_data_id: blocked_items.map(v => v.inventory_data_id)}, compare: 'IN'}})
  return [...block_rules, ...allow_rules]
}

module.exports = refreshCategory