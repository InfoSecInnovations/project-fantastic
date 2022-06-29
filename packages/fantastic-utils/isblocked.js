const matchesRule = require("./matchesrule")

/**
 * match an inventory item to a set of allow and block rules from the database
 * @param {{}} data 
 * @param {[]} allow_rules 
 * @param {[]} block_rules 
 * @returns 
 */
const isBlocked = (data, allow_rules, block_rules) => {
  if (allow_rules.some(rule => matchesRule(data, rule.data))) return false
  if (block_rules.some(rule => matchesRule(data, rule.data))) return true
  return false
}

module.exports = isBlocked