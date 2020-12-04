import DateString from './datestring'

export default date => {
  const diff = Date.now() - date
  if (diff < 60000) return 'just now'
  return `${DateString(diff / 1000 / 60)} ago`
}