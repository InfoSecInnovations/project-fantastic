import {h} from 'snabbdom/h'
import NodeName from '../../../common/util/nodename'
import NodesFromEdge from '../../util/nodesfromedge'

const connection_title = state => {
  const {from, to} = NodesFromEdge(state, state.selected.edge)
  const connections = from.connections.filter(v => v.to_node === to.node_id)
  return `${connections.length} Connection${connections.length > 1 ? 's' : ''}`
}

export default (state, send, nodes) => h('div.tab_bar', [
  nodes || state.selected.connection ? h('div.tabs', [
    h('div.tab', {
      on: {click: [send, {type: 'tab', tab: 'info'}]},
      class: {selected: state.tab === 'info'}
    }, 'Info'),
    h('div.tab', {
      on: {click: [send, {type: 'tab', tab: 'actions'}]},
      class: {selected: state.tab === 'actions'}
    }, 'Actions')
  ]) : undefined,
  h('div.tabs_title', nodes ? [
    h('div.icon_button small', [
      h('span.fas fa-external-link-alt', {on: {click: [send, {type: 'open_viewer', nodes}]}})
    ]), 
    h('div.text', nodes.map(v => NodeName(state.nodes[v])).join(', '))
  ] : [
    h('div.text', connection_title(state))
  ])
])