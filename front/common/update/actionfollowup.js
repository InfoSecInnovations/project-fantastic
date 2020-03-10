const actionFollowup = (state, action) => {
  let action_result = state.action_results.data[action.host][action.action]
  for (const keys of action.keys) {
    action_result = action_result[keys.id][keys.function]
  }
  action_result = action_result[action.id]
  action_result.status[action.function] = 'loading'
}

module.exports = actionFollowup