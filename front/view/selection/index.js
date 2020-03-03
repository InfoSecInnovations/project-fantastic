const H = require('snabbdom/h').default
const Info = require('./info')
const Actions = require('./actions')
const Edge = require('./edge')
const NodeName = require('../../util/nodename')

const get_tab = (state, send, node) => {
  if (state.tab == 'info') return Info(state, send, node)
  if (state.tab == 'actions') return Actions(state, send, node)
}

const selection = (state, send) => {
  if (typeof state.selected.node === 'number') {
    const node = state.nodes[state.selected.node]
    return H('div#selection', [
      H('div.tabs', [
        H('div.tab', {
          on: {click: [send, {type: 'tab', tab: 'info'}]},
          class: {selected: state.tab === 'info'}
        }, 'Info'),
        H('div.tab', {
          on: {click: [send, {type: 'tab', tab: 'actions'}]},
          class: {selected: state.tab === 'actions'}
        }, 'Actions'),
        H('div.tabs_title', H('div.content', NodeName(node)))
      ]),
      get_tab(state, send, node)
    ])
  }
  if (typeof state.selected.edge === 'string') return Edge(state, send)
}

module.exports = selection