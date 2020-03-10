const H = require('snabbdom/h').default
const Info = require('../../../common/view/info')
const Actions = require('../../../common/view/actions')
const Edge = require('./edge')
const NodeName = require('../../../common/util/nodename')

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
        H('div.tabs_title', H('div.content', [H('img.icon_button', {attrs: {src: 'images/popout.svg'}, on: {click: [send, {type: 'open_viewer', node: state.selected.node}]}}), H('div.text', NodeName(node))]))
      ]),
      get_tab(state, send, node)
    ])
  }
  if (typeof state.selected.edge === 'string') return Edge(state, send)
}

module.exports = selection