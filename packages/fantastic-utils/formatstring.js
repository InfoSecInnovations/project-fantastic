const formatString = (string, parameters) => {
  Object.entries(parameters).forEach(v => string = string.replace(new RegExp(`$${v[0]}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `${v[1]}`)) // regex escape magic I found on StackOverflow
  return string
}

module.exports = formatString