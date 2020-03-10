const nodesFromEdge = (state, edge_id) => {
  const nodes = state.vis.getConnectedNodes(edge_id)
  return {from: state.nodes[nodes[0]], to: state.nodes[nodes[1]], from_id: nodes[0], to_id: nodes[1]}
}

module.exports = nodesFromEdge