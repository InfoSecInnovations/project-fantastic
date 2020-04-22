const H = require('snabbdom/h').default
const TestResult = require('./testresult')

const tests = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Tests')
  ]),
  H('div.scroll', Object.entries(state.tests).map(v => {
    const test = v[0]
    const parameters = {
      initial: v[1].parameters.reduce((result, p) => ({...result, [p.name]: p.default}), {}),
      get: () => ({...parameters.initial, ...state.test_parameters[test]}),
      edit: () => H('div.parameters', v[1].parameters.map(p => H('div.item', [
        H('label', p.name), 
        H('input')])))
    }
    return TestResult(
      state, 
      send, 
      v[1],
      parameters,
      state.test_results.data[test],
      state.test_results.date[test],
      state.test_results.parameters[test],
      state.test_results.status[test] === 'loading',
      {type: 'run_test', test, parameters: parameters.get()}
    )
  }))
])

module.exports = tests