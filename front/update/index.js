const update = (state, action) => {
  if (action.type == 'nodes') state.nodes = action.nodes
  if (action.type == 'graph_container') state.graph_container = action.container
  return state
}

module.exports = update