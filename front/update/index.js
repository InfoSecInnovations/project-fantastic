const update = (state, action) => {
  if (action.type == 'nodes') state.nodes = action.nodes
  if (action.type == 'node_state') state.search.node_state = action.value
  return state
}

module.exports = update