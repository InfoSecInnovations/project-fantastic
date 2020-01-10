const update = (state, action) => {
  if (action.type == 'nodes') state.nodes = action.nodes
  if (action.type == 'graph_container') state.graph_container = action.container
  if (action.type == 'select') state.selected.node = action.node
  return state
}

module.exports = update