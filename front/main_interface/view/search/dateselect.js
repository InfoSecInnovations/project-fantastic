const H = require('snabbdom/h').default
const DateString = require('../../../common/util/datestring')

const options = [5, 15, 30, 60, 480, 1440, 0]

const option_label = minutes => {
  if (!minutes) return 'forever'
  return `last ${DateString(minutes)}`
}

const dateSelect = (state, send) => H('div.selector', [
  H('label', {attrs: {for: 'date_select'}}, 'Data from'),
  H('select#date_select', {
    attrs: {name: 'date', disabled: state.loading}, 
    on: {change: e => send({type: 'date', date: parseInt(e.target.value)})}}, 
    options.map((v, i) => 
      H('option', {attrs: {value: v, selected: v === state.search.date}}, option_label(v))
    )
  )
])

module.exports = dateSelect