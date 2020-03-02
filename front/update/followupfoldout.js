const followupFoldout = (state, action) => {
  let action_result = state.action_results.data[action.hostname][action.action]
  for (const keys of action.keys) {
    action_result = action_result[keys.id][keys.function]
  }
  action_result = action_result[action.id]
  action_result.foldout[action.function] = action.value
}

module.exports = followupFoldout