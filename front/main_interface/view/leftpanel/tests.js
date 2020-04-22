const H = require('snabbdom/h').default
const TestResult = require('./testresult')

const tests = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Tests')
  ]),
  H('div.scroll', Object.entries(state.tests).map(v => {
    const test = v[0]
    const parameters = v[1].parameters.reduce((result, p) => ({...result, [p.name]: p.default}), {})
    return TestResult(
      state, 
      send, 
      v[1],
      parameters,
      state.test_results.data[test],
      state.test_results.date[test],
      state.test_results.status[test] === 'loading',
      {type: 'run_test', test, parameters}
    )
  }))
])

module.exports = tests