const isBlocked = (data, allow_rules, block_rules) => {
  const match = (data, filter) => Object.entries(filter).every(([key, value]) => data[key] == value)
  if (allow_rules.some(rule => match(data, rule.data))) return false
  if (block_rules.some(rule => match(data, rule.data))) return true
  return false
}

module.exports = isBlocked