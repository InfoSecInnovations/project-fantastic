const H = require('snabbdom/h').default

const to_ms = minutes => minutes * 60 * 1000

const options = [5, 30, 60, 90, 1440, 0]
const default_index = 1
const unit_string = (amount, unit) => amount > 1 ? `${amount} ${unit}s` : unit

const option_label = minutes => {
  if (!minutes) return 'forever'
  if (minutes < 60) return `last ${unit_string(minutes, 'minute')}`
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  if (remainder) return `last ${unit_string(hours, 'hour')} and ${unit_string(remainder, 'minute')}`
  return `last ${unit_string(hours, 'hour')}`
}

const search = (state, send) => {
  if (!state.nodes) return
  return H('div#search', [
    H('div.date', [
      H('label', {attrs: {for: 'date_select'}}, 'Data from'),
      H('select#date_select', {attrs: {name: 'date'}, on: {change: e => send({type: 'date', date: e.target.value == 0 ? 0 : Date.now() - e.target.value})}}, options.map((v, i) => 
        H('option', {attrs: {value: to_ms(v), selected: i === default_index}}, option_label(v)
      )))
    ])
  ])
}

module.exports = search