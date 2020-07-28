import {h} from 'snabbdom/h'
const DateString = require('../../../../common/util/datestring')

const options = [5, 15, 30, 60, 480, 1440, 0]

const option_label = minutes => {
  if (!minutes) return 'forever'
  return `last ${DateString(minutes)}`
}

export default (state, send) => h('div.selector', [
  h('label', {attrs: {for: 'date_select'}}, 'Data from'),
  h('select#date_select', {
    attrs: {name: 'date', disabled: state.loading}, 
    on: {change: e => send({type: 'date', date: parseInt(e.target.value)})}}, 
    options.map((v, i) => 
      h('option', {attrs: {value: v, selected: v === state.search.date}}, option_label(v))
    )
  )
])