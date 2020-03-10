const H = require('snabbdom/h').default
const Connections = require('../../../common/view/connections')
const NodeName = require('../../../common/util/nodename')
const NodesFromEdge = require('../../util/nodesfromedge')

const edge = (state, send) => {
  const {from, to, from_id, to_id} = NodesFromEdge(state, state.selected.edge)
  return H('div#selection', [
    Connections(from.connections.filter(v => v.to_node === to.node_id), [
      'Connections from ', 
      H('a', {
        on: {click: [
          [send, {type: 'vis_select', node: from_id}],
          [send, {type: 'select', node: from_id}]
        ]}
      }, NodeName(from)), 
      ' to ', 
      H('a', {
        on: {click: [
          [send, {type: 'vis_select', node: to_id}],
          [send, {type: 'select', node: to_id}]
        ]}
      }, NodeName(to))
    ])
  ])
}

module.exports = edge