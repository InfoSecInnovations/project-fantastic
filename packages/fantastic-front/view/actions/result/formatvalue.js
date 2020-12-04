import TimeAgo from '../../../util/timeago'

export default value => {
  if (value === null) return 'null'
  if (typeof value === 'undefined') return 'undefined'
  if (typeof value === 'object') {
    if (value.date) return TimeAgo(value.date)
  }
  return `${value}`
}
