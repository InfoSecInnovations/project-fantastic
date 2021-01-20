export default (state, action) => {
  if (!action.results) return
  state.test_results.data[action.test] = action.results
  state.test_results.status[action.test] = 'loaded'
  state.test_results.date[action.test] = action.date
  state.test_results.parameters[action.test] = action.parameters
  state.test_results.test_ids[action.test] = action.test_id
}