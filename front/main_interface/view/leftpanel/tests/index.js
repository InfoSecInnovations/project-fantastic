const H = require('snabbdom/h').default
const TestResult = require('../testresult')
const Parameter = require('./parameter')

const tests = (state, send) => H('div.scroll_container.panel', [
  H('div.item', [
    H('div.title', 'Tests')
  ]),
  H('div.scroll', Object.entries(state.tests).map(v => {
    const test = v[0]
    const parameters = {
      initial: v[1].parameters.reduce((result, p) => ({...result, [p.name]: p.default}), {}),
      get: () => ({...parameters.initial, ...state.test_parameters[test]}),
      edit: () => 
        H('div.parameters', [
          H('div.subsubtitle', 'Parameters'), 
          ...v[1].parameters
          .map(p => Parameter(state.test_parameters[test] && state.test_parameters[test][p.name], test, send, p))
        ])
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