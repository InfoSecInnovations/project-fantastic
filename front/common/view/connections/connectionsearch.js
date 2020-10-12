import {h} from 'snabbdom/h'
import NodesFromEdge from '../../../main_interface/util/nodesfromedge'

const checkbox = (state, send, label, key) => h('div', [
  h('input', {
    attrs: {type: 'checkbox', id: `connection_match_${key}`}, 
    props: {checked: state.connection_search[key]}, 
    on: {change: e => send({type: 'connection_search', key, value: e.target.checked})}}),
  h('label', {attrs: {for: `connection_match_${key}`}}, label)
])

export default (state, send, connection) => {
  const expanded = state.connection_search.expanded_connection === connection.connection_id
  return h('div', [
    h('div.item', [
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
    ]) : undefined,
    h('div.button', 
      {on: {click: e => {
        if (state.selected.edge) send({type: 'select', node: NodesFromEdge(state, state.selected.edge).from_id})
        send({type: 'connection', connection})
        send({type: 'tab', tab: 'actions'})
      }}},
      'View Connection Actions'
    )
  ])
}