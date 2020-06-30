const testResults = (state, action) => {
  if (!action.results) return
  state.test_results.data[action.test] = action.results
  state.test_results.status[action.test] = 'loaded'
  state.test_results.date[action.test] = action.date
  state.test_results.parameters[action.test] = action.parameters
}

module.exports = testResults