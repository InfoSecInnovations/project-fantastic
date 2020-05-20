const followupFoldout = (state, action) => {
  let action_result = state.action_results.data[action.hostname][action.action]
  for (const key of action.followups) {
    action_result = action_result.result[key.index].followups[key.followup]
  }
  action_result.foldout = action.value
}

module.exports = followupFoldout