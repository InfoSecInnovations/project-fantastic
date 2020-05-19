const followupResult = (state, action) => {
  let action_result = state.action_results.data[action.hostname][action.action]
  for (const key of action.followups) {
    if (!action_result.followups[key]) action_result.followups[key] = {}
    action_result = action_result.followups[key]
  }
  action_result.result = action.result
  action_result.foldout = action.result ? true : undefined
  action_result.status = 'loaded'
  action_result.date = action.date
  if (action.result && action.result.followups) {
    if (!action_result.followups) action_result.followups = {}
    action.result.followups.forEach(v => {
      if (!action_result.followups[v.function]) action_result.followups[v.function] = {}
    })
  }
}

module.exports = followupResult