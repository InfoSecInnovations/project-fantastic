const performAction = (state, action) => {
  state.action_results.status[action.host][action.action] = 'loading'
}

module.exports = performAction