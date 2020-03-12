const unit_string = (amount, unit) => `${amount} ${unit}${amount === 1 ? '' : 's'}`

const dateString = minutes => {
  minutes = Math.round(minutes)
  if (minutes < 60) return unit_string(minutes, 'minute')
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  if (remainder) return `${unit_string(hours, 'hour')} and ${unit_string(remainder, 'minute')}`
  return `${unit_string(hours, 'hour')}`
}

module.exports = dateString