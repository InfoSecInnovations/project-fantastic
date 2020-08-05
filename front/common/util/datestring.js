const unit_string = (amount, unit) => `${amount} ${unit}${amount === 1 ? '' : 's'}`

export default minutes => {
  minutes = Math.round(minutes)
  if (minutes < 60) return unit_string(minutes, 'minute')
  const hours = Math.floor(minutes / 60)
  const minutes_remainder = minutes % 60
  if (hours < 24) {
    if (minutes_remainder) return `${unit_string(hours, 'hour')} and ${unit_string(minutes_remainder, 'minute')}`
    return `${unit_string(hours, 'hour')}`
  }
  const days = Math.floor(hours / 24)
  const hours_remainder = hours % 24
  return `${unit_string(days, 'day')}${hours_remainder ? `, ${unit_string(hours_remainder, 'hour')}` : ''}${minutes_remainder ? `, ${unit_string(minutes_remainder, 'minute')}` : ''}`
}