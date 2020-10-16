/**
 * Check values for undefined/null while allowing numbers and booleans
 * @param {*} v 
 */
const isValid = v => {
  if (typeof v === 'number' || typeof v === 'boolean') return true
  return v
}

module.exports = isValid