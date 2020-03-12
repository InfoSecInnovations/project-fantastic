const followupResult = (state, action) => {
  let action_result = state.action_results.data[action.hostname][action.action]
  for (const keys of action.keys) {
    action_result = action_result[keys.id][keys.function]
  }
  action_result = action_result[action.id]
  action_result.foldout[action.function] = action.result.length ? true : undefined
  action_result.status[action.function] = 'loaded'
  if (!action_result[action.function]) action_result[action.function] = {}
  action_result = action_result[action.function]
  action_result.date = action.date
  action.result.forEach(v => {
    if (!action_result[v.id]) action_result[v.id] = {value: v.value, foldout: {}, status: {}}
    else action_result[v.id].value = v.value
  })
}

module.exports = followupResult