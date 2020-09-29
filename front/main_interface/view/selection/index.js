import {h} from 'snabbdom/h'
import Info from '../../../common/view/info'
import Actions from '../../../common/view/actions'
import ConnectionInfo from './connectioninfo'
import NodeName from '../../../common/util/nodename'
import Multi from './multi'
import MultiActions from './multiactions'
import NodesFromEdge from '../../util/nodesfromedge'
import IPAddress from '../../../common/util/ipaddress'

const connection_title = state => {
  const {from, to} = NodesFromEdge(state, state.selected.edge)
  const connections = from.connections.filter(v => v.to_node === to.node_id)
  return `${connections.length} Connection${connections.length > 1 ? 's' : ''}`
}

const tabs = (state, send, nodes) => h('div.tab_bar', [
    h('div.tabs', [
      h('div.tab', {
        on: {click: [send, {type: 'tab', tab: 'info'}]},
        class: {selected: state.tab === 'info'}
      }, 'Info'),
      h('div.tab', {
        on: {click: [send, {type: 'tab', tab: 'actions'}]},
        class: {selected: state.tab === 'actions'}
      }, 'Actions')
    ]),
    h('div.tabs_title', nodes ? [
      h('div.icon_button small', [
        h('span.fas fa-external-link-alt', {on: {click: [send, {type: 'open_viewer', nodes}]}})
      ]), 
      h('div.text', nodes.map(v => NodeName(state.nodes[v])).join(', '))
    ] : [
      h('div.text', connection_title(state))
    ])
  ])

const get_tab = (state, send, nodes) => {
  if (state.tab == 'info') {
    if (state.selected.edge) return ConnectionInfo(state, send)
    if (nodes.length > 1) return Multi(state, send)
    return Info(state, send, state.nodes[nodes[0]])
  }
  if (state.tab == 'actions') {
    if (state.selected.edge) {
      const {from, to} = NodesFromEdge(state, state.selected.edge)
      if (state.selected.connection) return Actions(state, send, from, state.selected.connection)
      const connections = from.connections.filter(v => v.to_node === to.node_id)
      return h('div.scroll_container', h('div.scroll', connections.map(v => h('div.scroll_item', {
        on: {click: [send, {type: 'connection', connection: v}]}
      }, [
        h('div.item', `Local address: ${IPAddress(v.local_address, v.local_port)}`),
        h('div.item', `Remote address: ${IPAddress(v.remote_address, v.remote_port)}`)
      ]))))
    }
    if (nodes.length > 1) return MultiActions(state, send)
    return Actions(state, send, state.nodes[nodes[0]])
  }
}

export default (state, send) => {
  const nodes = state.selected.nodes && state.selected.nodes.length ? state.selected.nodes : (typeof state.selected.node != 'undefined' ? [state.selected.node] : undefined)
  if (!nodes && !state.selected.edge) return
  const tab = get_tab(state, send, nodes)
  return h('div#selection.panel', [
    tabs(state, send, nodes),
    ...(Array.isArray(tab) ? tab : [tab])
  ])
}