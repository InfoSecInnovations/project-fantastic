const DateString = require('./datestring')

const timeAgo = date => {
  const diff = Date.now() - date
  if (diff < 60000) return 'just now'
  return `${DateString(diff / 1000 / 60)} ago`
}

module.exports = timeAgo