const followupResult = (state, action) => {
  if (Array.isArray(action.result) && !action.result.length) action.result = undefined
  let action_result = state.action_results[action.hostname][action.action]
  for (const key of action.followups) {
    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]
  }
  if (action.followup && action.result) {
    action_result.result.find(v => v.label === action.followup.label).followups[action.followup.followup] = action.result.find(v => v.label === action.followup.label).followups[action.followup.followup]
  }
  else action_result.result = action.result
  action_result.foldout = action.result ? true : undefined
  action_result.status = 'loaded'
  action_result.date = action.date
}

module.exports = followupResult