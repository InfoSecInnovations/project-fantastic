import {h} from 'snabbdom/h'
import IPAddress from '../util/ipaddress'

const checkbox = (state, send, label, key) => h('div', [
  h('input', {
    attrs: {type: 'checkbox', id: `connection_match_${key}`}, 
    props: {checked: state.connection_search[key]}, 
    on: {change: e => send({type: 'connection_search', key, value: e.target.checked})}}),
  h('label', {attrs: {for: `connection_match_${key}`}}, label)
])

const connection_view = (state, send, connection) => {
  const expanded = state.connection_search.expanded_connection === connection.connection_id
  return h('div.scroll_item', [
    h('div.item', `Local address: ${IPAddress(connection.local_address, connection.local_port)}`),
    h('div.item', `Remote address: ${IPAddress(connection.remote_address, connection.remote_port)}`),
    h('div.item', `Process: ${connection.process.name}`),
    h('div.item', `State: ${connection.state.replace('_', ' ')}`),
    h('div.item', [ // TODO: hide this in node viewer
      h('div', 'Find similar connections'), 
      h(`div.foldout fas fa-chevron-${expanded ? 'down' : 'right'} fa-fw`, {on: {click: [send, {type: 'expand_connection', connection: expanded ? undefined : connection.connection_id}]}})
    ]),
    expanded ? h('div.connection_match', [
      h('div.checkboxes', [
        checkbox(state, send, 'Match local address', 'local_ip'),
        checkbox(state, send, 'Match remote address', 'remote_ip'),
        checkbox(state, send, 'Match process', 'process')
      ]),
      h('div.button', {}, 'Go')
    ]) : undefined
  ])
}

export default (state, send, connections, label) => [
  h('h4', [label || 'Connections', ` (${connections.length}):`].flat()),
  connections.length ? h('div.scroll', connections.map(v => connection_view(state, send, v))) : undefined
]