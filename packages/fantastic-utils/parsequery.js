const parseQuery = query => query.split('&').reduce((result, v) => {
  if (!v) return
  const split = v.split('=')
  const value = split[1].split(',')
  result[split[0]] = value.length === 1 ? value[0] : value
  return result
}, {})

module.exports = parseQuery