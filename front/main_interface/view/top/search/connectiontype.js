import {h} from 'snabbdom/h'

const options = ['all', 'different_host']

export default (state, send) =>
  h('div.selector', [
    h('label', {attrs: {for: 'connection_type_select'}}, 'Connections between'),
    h('select#connection_type_select', {
      attrs: {name: 'connection_type', disabled: state.loading},
      on: {change: e => send({type: 'connection_type', connection_type: e.target.value})}}, 
      options.map(v => h('option', {attrs: {value: v, selected: v === state.search.connection_type}}, v))
    )
  ])