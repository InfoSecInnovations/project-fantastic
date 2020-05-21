const performAction = (state, action) => {
  if (!state.action_results[action.host]) {
    state.action_results[action.host] = {}
  }
  if (!state.action_results[action.host][action.action]) {
    state.action_results[action.host][action.action] = {}
  }
  state.action_results[action.host][action.action].status = 'loading'
}

module.exports = performAction