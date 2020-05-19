const followupFoldout = (state, action) => {
  let action_result = state.action_results.data[action.hostname][action.action]
  for (const key of action.followups) {
    action_result = action_result.followups[key]
  }
  action_result[action.followups[action.followups.length - 1]].foldout = action.value
}

module.exports = followupFoldout