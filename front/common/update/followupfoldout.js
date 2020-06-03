const followupFoldout = (state, action) => {
  let action_result = state.action_results[action.hostname][action.action]
  for (const key of action.followups) {
    action_result = action_result.result.find(v => v.label === key.label).followups[key.followup]
  }
  action_result.foldout = action.value
}

module.exports = followupFoldout