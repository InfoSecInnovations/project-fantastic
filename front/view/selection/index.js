const H = require('snabbdom/h').default
const Info = require('./info')
const Actions = require('./actions')
const Connections = require('./connections')
const NodeName = require('../../util/nodename')
const NodesFromEdge = require('../../util/nodesfromedge')

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
    const {from, to} = NodesFromEdge(state, state.selected.edge)
    return H('div#selection', [
      Connections(from.connections.filter(v => v.to_node === to.node_id), `Connections from ${NodeName(from)} to ${NodeName(to)}`)
    ])
  }
}

module.exports = selection