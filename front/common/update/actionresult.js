const actionResult = (state, action) => {
  if (Array.isArray(action.result) && !action.result.length) action.result = undefined
  if (!state.action_results[action.hostname]) {
    state.action_results[action.hostname] = {}
  }
  if (!state.action_results[action.hostname][action.action]) {
    state.action_results[action.hostname][action.action] = {}
  }
  const action_result = state.action_results[action.hostname][action.action]
  if (action.followup) {
    action_result.result.find(v => v.label === action.followup.label).followups[action.followup.followup] = action.result.find(v => v.label === action.followup.label).followups[action.followup.followup]
  }
  else action_result.result = action.result
  action_result.foldout = action.result ? true : undefined
  action_result.status = 'loaded'
  action_result.date = action.date
}

module.exports = actionResult