const H = require('snabbdom/h').default
const Info = require('./info')
const Actions = require('./actions')
const Connections = require('./connections')
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
        }, 'Actions')
      ]),
      get_tab(state, send, node)
    ])
  }
  if (typeof state.selected.edge === 'string') {
    const nodes = state.vis.getConnectedNodes(state.selected.edge)
    const from_node = state.nodes[nodes[0]]
    const to_node = state.nodes[nodes[1]]
    return H('div#selection', [
      Connections(from_node.connections.filter(v => v.to_node === to_node.node_id), `Connections from ${NodeName(from_node)} to ${NodeName(to_node)}`)
    ])
  }
}

module.exports = selection