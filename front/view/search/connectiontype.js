const H = require('snabbdom/h').default

const options = ['all', 'different_ip', 'different_host']

const connectionType = (state, send) =>     H('div.connection_endpoints', [
  H('label', {attrs: {for: 'connection_type_select'}}, 'Connections to'),
  H('select#connection_type_select', {
    attrs: {name: 'connection_type'},
    on: {change: e => send({type: 'connection_type', connection_type: e.target.value})}}, 
    options.map((v, i) => 
      H('option', {attrs: {value: v, selected: v === state.search.connection_type}}, v)
    )
  )
])

module.exports = connectionType