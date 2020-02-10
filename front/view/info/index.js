const H = require('snabbdom/h').default
const NodeTop = require('./nodetop')
const Connections = require('./connections')
const NodeName = require('../../util/nodename')

const info = (state, send) => {
  if (typeof state.selected.node === 'number') {
    const node = state.nodes[state.selected.node]
    return H('div#info', [
      NodeTop(node),
      H('div.divider'),
      Connections(node.connections)
    ])
  }
  if (typeof state.selected.edge === 'string') {
    const nodes = state.vis.getConnectedNodes(state.selected.edge)
    const from_node = state.nodes[nodes[0]]
    const to_node = state.nodes[nodes[1]]
    return H('div#info', [
      Connections(from_node.connections.filter(v => v.to_node === to_node.node_id), `Connections from ${NodeName(from_node)} to ${NodeName(to_node)}`)
    ])
  }
}

module.exports = info