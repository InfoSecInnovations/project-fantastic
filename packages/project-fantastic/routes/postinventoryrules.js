const { transaction } = require('../db')

const postInventoryRules = async (user, res, req, query, _, http_data) => {
  // TODO: user permissions?
  // TODO: what validations do we need here?
  const date = Date.now()
  const db = await transaction()
    const existing = await db.get({table: 'inventory_rules', columns: ['inventory_rule_id'], conditions: {columns: {rule_type: query.mode, category: query.category, data: http_data}}})
    if (!existing) await db.insert('inventory_rules', {rule_type: query.mode, category: query.category, data: http_data, user_id: user.user_id, date})
  db.close()
  res.end()
  // TODO: trigger inventory scan here to check against new rule?
}

module.exports = postInventoryRules