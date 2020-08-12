import {h} from 'snabbdom/h'
import TestEntry from '../testentry'
import Parameter from './parameter'
import SearchBar from '../../../../common/view/searchbar'

export default (state, send) => {
  const tests = state.flex_search.tests.query && state.flex_search.tests.results ? state.flex_search.tests.results.reduce((r, v) => ({...r, [v]: state.tests[v]}), {}) : state.tests
  return h('div.scroll_container', [
    h('h2.panel_title', 'Tests'),
    SearchBar(send, 'tests'),
    h('div.scroll spaced', Object.entries(tests).map(v => {
      const test = v[0]
      const parameters = {
        initial: v[1].parameters.reduce((result, p) => ({...result, [p.name]: p.default}), {}),
        get: () => ({...parameters.initial, ...state.test_parameters[test]}),
        edit: () => 
          h('div.parameters', [
            h('h4', 'Parameters'), 
            ...v[1].parameters
            .map(p => Parameter(state.test_parameters[test] && state.test_parameters[test][p.name], test, send, p))
          ]),
        result: () => h('div.parameters', [
          'Parameters used:',
          h('ul', Object.entries(state.test_results.parameters[test]).map(v => h('li', `${v[0]}: ${v[1]}`)))
        ])
      }
      return TestEntry(
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
}