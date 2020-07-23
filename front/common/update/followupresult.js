const followupResult = (state, action) => {
  if (Array.isArray(action.result) && !action.result.length) action.result = undefined
  let action_result = state.action_results[action.hostname][action.action]
  for (const key of action.followups) {
    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]
  }
  if (action.followup) {
    if (action.result) action_result.result.find(v => v.label === action.followup.label).followups[action.followup.followup] = action.result.find(v => v.label === action.followup.label).followups[action.followup.followup]
  }
  else action_result.result = action.result
  action_result.foldout = true
  action_result.requests && action_result.requests-- // we may not have any requests if we're loading the result from the history so we have to check it
  if (!action_result.requests) action_result.status = 'loaded'
  action_result.date = action.date
}

module.exports = followupResult