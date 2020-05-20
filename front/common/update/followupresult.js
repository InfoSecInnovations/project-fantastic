const followupResult = (state, action) => {
  let action_result = state.action_results.data[action.hostname][action.action].result
  for (const key of action.followups) {
    action_result = action_result[key.index].followups[key.followup]
  }
  action_result.result = action.result
  action_result.foldout = action.result ? true : undefined
  action_result.status = 'loaded'
  action_result.date = action.date
}

module.exports = followupResult