const H = require('snabbdom/h').default
const Info = require('../../../common/view/info')
const Actions = require('../../../common/view/actions')
const Edge = require('./edge')
const NodeName = require('../../../common/util/nodename')
const Multi = require('./multi')
const MultiActions = require('./multiactions')

const tabs = (state, send, nodes) => {
  if (nodes && nodes.length) return H('div.tabs', [
    H('div.tab', {
      on: {click: [send, {type: 'tab', tab: 'info'}]},
      class: {selected: state.tab === 'info'}
    }, 'Info'),
    H('div.tab', {
      on: {click: [send, {type: 'tab', tab: 'actions'}]},
      class: {selected: state.tab === 'actions'}
    }, 'Actions'),
    H('div.tabs_title', 
      H('div.content', [
        H('div.icon_button.tooltippable', [
          H('img', {attrs: {src: 'images/popout.svg'}, on: {click: [send, {type: 'open_viewer', nodes}]}}),
          H('div.tooltip', H('div.item', 'Show in new tab'))
        ]), 
        H('div.text', nodes.map(v => NodeName(state.nodes[v])).join(', '))
      ])
    )
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

const selection = (state, send) => {
  const nodes = state.selected.nodes && state.selected.nodes.length ? state.selected.nodes : (typeof state.selected.node != 'undefined' ? [state.selected.node] : undefined)
  if (!nodes && typeof state.selected.edge !== 'string') return
  return H('div#selection', [
    tabs(state, send, nodes),
    get_tab(state, send, nodes)
  ])
}

module.exports = selection