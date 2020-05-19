const performAction = (state, action) => {
  if (!state.action_results.data[action.host]) {
    state.action_results.data[action.host] = {}
  }
  if (!state.action_results.data[action.host][action.action]) {
    state.action_results.data[action.host][action.action] = {}
  }
  state.action_results.data[action.host][action.action].status = 'loading'
}

module.exports = performAction