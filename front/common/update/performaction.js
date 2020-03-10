const performAction = (state, action) => {
  if (!state.action_results.data[action.host]) {
    state.action_results.data[action.host] = {}
    state.action_results.foldouts[action.host] = {}
    state.action_results.status[action.host] = {}
  }
  state.action_results.status[action.host][action.action] = 'loading'
}

module.exports = performAction