import {h} from 'snabbdom/h'
import NodeName from '@infosecinnovations/fantastic-front/util/nodename'
import NodesFromEdge from '../../util/nodesfromedge'
import CanShowActions from './canshowactions'

const connection_title = state => {
  const {from, to} = NodesFromEdge(state, state.selected.edge)
  const connections = from.connections.filter(v => v.to_node === to.node_id)
  return `${connections.length} Connection${connections.length > 1 ? 's' : ''}`
}

const base_tabs = (state, send) => [
    h('div.tab', {
      on: {click: [send, {type: 'tab', tab: 'info'}]},
      class: {selected: state.tab === 'info'}
    }, 'Info'),
    h('div.tab', {
      on: {click: [send, {type: 'tab', tab: 'actions'}]},
      class: {selected: state.tab === 'actions'}
    }, 'Actions')
  ]

export default (state, send, nodes) => {
  return h('div.tab_bar',[
    CanShowActions(state, nodes) ? h('div.tabs', [
      ...base_tabs(state, send),
      state.test_resolve ? h('div.tab', {
        on: {click: e => send({type: 'tab', tab: 'issues'})},
        class: {selected: state.tab === 'issues'}
      }, 'Fix Issues') : undefined
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
} 