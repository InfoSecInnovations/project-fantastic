const actionFollowup = (state, action) => {
  let action_result = state.action_results[action.host][action.action]
  for (const key of action.followups) {
    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]
  }
  action_result.status = 'loading'
  action_result.requests = (action_result.requests || 0) + 1 // track the number of requests we're waiting for relating to this followup
}

module.exports = actionFollowup