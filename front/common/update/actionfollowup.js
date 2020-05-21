const actionFollowup = (state, action) => {
  let action_result = state.action_results[action.host][action.action]
  for (const key of action.followups) {
    action_result = action_result.result[key.index].followups[key.followup]
  }
  action_result.status = 'loading'
}

module.exports = actionFollowup