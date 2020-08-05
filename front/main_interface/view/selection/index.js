import {h} from 'snabbdom/h'
import Info from '../../../common/view/info'
import Actions from '../../../common/view/actions'
import Edge from './edge'
import NodeName from '../../../common/util/nodename'
import Multi from './multi'
import MultiActions from './multiactions'

const tabs = (state, send, nodes) => {
  if (nodes && nodes.length) return h('div.tab_bar', [
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
    h('div.tabs_title', [
      h('div.icon_button small', [
        h('span.fas fa-external-link-alt', {on: {click: [send, {type: 'open_viewer', nodes}]}})
      ]), 
      h('div.text', nodes.map(v => NodeName(state.nodes[v])).join(', '))
    ])
  ])
}

const get_tab = (state, send, nodes) => {
  if (nodes && nodes.length) {
    if (state.tab == 'info') {
      if (nodes.length > 1) return Multi(state, send)
      return Info(state, send, state.nodes[nodes[0]])
    }
    if (state.tab == 'actions') {
      if (nodes.length > 1) return MultiActions(state, send)
      return Actions(state, send, state.nodes[nodes[0]])
    }
  }
  return Edge(state, send)
}

export default (state, send) => {
  const nodes = state.selected.nodes && state.selected.nodes.length ? state.selected.nodes : (typeof state.selected.node != 'undefined' ? [state.selected.node] : undefined)
  if (!nodes && typeof state.selected.edge !== 'string') return
  const tab = get_tab(state, send, nodes)
  return h('div#selection.panel', [
    tabs(state, send, nodes),
    ...(Array.isArray(tab) ? tab : [tab])
  ])
}