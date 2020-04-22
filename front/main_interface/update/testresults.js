const testResults = (state, action) => {
  state.test_results.data[action.test] = action.results
  state.test_results.status[action.test] = 'loaded'
  state.test_results.date[action.test] = action.date
}

module.exports = testResults