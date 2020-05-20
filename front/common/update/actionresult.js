const actionResult = (state, action) => {
  if (Array.isArray(action.result) && !action.result.length) action.result = undefined
  if (!state.action_results.data[action.hostname]) {
    state.action_results.data[action.hostname] = {}
  }
  if (!state.action_results.data[action.hostname][action.action]) {
    state.action_results.data[action.hostname][action.action] = {}
  }
  const action_result = state.action_results.data[action.hostname][action.action]
  action_result.result = action.result
  action_result.foldout = action.result ? true : undefined
  action_result.status = 'loaded'
  action_result.date = action.date
}

module.exports = actionResult