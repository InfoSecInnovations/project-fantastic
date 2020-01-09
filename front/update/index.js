const update = (state, action) => {
  if (action.type == 'nodes') state.nodes = action.nodes
  return state
}

module.exports = update