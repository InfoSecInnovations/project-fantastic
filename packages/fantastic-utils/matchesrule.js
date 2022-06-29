/**
 * Check if a single inventory item matches a rule
 * @param {{}} data 
 * @param {{}} filter 
 * @returns 
 */
const matchesRule = (data, filter) => Object.entries(filter).every(([key, value]) => data[key] == value)

module.exports = matchesRule