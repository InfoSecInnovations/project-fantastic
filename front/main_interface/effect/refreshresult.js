const LoadNodeResults = require('../../common/effect/loadnoderesults')

const refreshResult = (state, action, send, data) => {
  const node_indices = action.results.map(v => state.nodes.findIndex(n => n.node_id == v.node_id)).filter(v => v !== -1)
  const highlight = node_indices.filter(v => action.results.find(r => r.node_id === state.nodes[v].node_id && r.result != data.pass.condition))
  if (action.select) {
    send({type: 'select', nodes: highlight})
    send({type: 'vis_select', nodes: highlight})
  }
  LoadNodeResults(node_indices.map(v => state.nodes[v]), send)
}

module.exports = refreshResult