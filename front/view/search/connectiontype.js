const H = require('snabbdom/h').default

const options = ['all', 'different_host']

const connectionType = (state, send) =>
  H('div.selector', [
    H('label', {attrs: {for: 'connection_type_select'}}, 'Connections between'),
    H('select#connection_type_select', {
      attrs: {name: 'connection_type', disabled: state.loading},
      on: {change: e => send({type: 'connection_type', connection_type: e.target.value})}}, 
      options.map(v => H('option', {attrs: {value: v, selected: v === state.search.connection_type}}, v))
    )
  ])

module.exports = connectionType