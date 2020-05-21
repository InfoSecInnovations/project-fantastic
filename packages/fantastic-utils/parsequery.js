const parseQuery = query => query.split('&').reduce((result, v) => {
  if (!v) return
  const split = v.split('=')
  if (split[1].startsWith('[') && split[1].endsWith(']')) {
    result[split[0]] = split[1].replace('[', '').replace(']', '').split(',')
  }
  else result[split[0]] = split[1]
  return result
}, {})

module.exports = parseQuery