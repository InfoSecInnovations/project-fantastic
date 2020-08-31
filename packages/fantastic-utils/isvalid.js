const isValid = v => {
  if (typeof v === 'number' || typeof v === 'boolean') return true
  return v
}

module.exports = isValid