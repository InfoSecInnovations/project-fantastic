const followupResult = (state, action) => {
  if (Array.isArray(action.result) && !action.result.length) action.result = undefined
  let action_result = state.action_results.data[action.hostname][action.action]
  for (const key of action.followups) {
    action_result = action_result.result[key.index].followups[key.followup]
  }
  action_result.result = action.result
  action_result.foldout = action.result ? true : undefined
  action_result.status = 'loaded'
  action_result.date = action.date
}

module.exports = followupResult