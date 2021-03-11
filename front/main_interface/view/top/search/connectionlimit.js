import {h} from 'snabbdom/h'

const options = ['none', 10, 50, 100, 200]

const option_label = option => {
  if (!option || option == 'none') return 'Infinite'
  return option
}

export default (state, send) => h('div.selector', [
  h('label', {attrs: {for: 'limit_select'}}, 'Limit connections per host'),
  h('select#limit_select', {
    attrs: {name: 'date', disabled: state.loading}, 
    on: {change: e => send({type: 'connection_limit', limit: e.target.value == 'none' ? undefined : parseInt(e.target.value)})}}, 
    options.map((v, i) => 
      h('option', {attrs: {value: v, selected: v === state.search.connection_limit}}, option_label(v))
    )
  )
])