import {h} from 'snabbdom/h'
import TestEntry from '../testentry'
import Parameter from './parameter'

export default (state, send) => h('div.scroll_container.panel', [
  h('div.item', [
    h('div.title', 'Tests')
  ]),
  h('div.scroll', Object.entries(state.tests).map(v => {
    const test = v[0]
    const parameters = {
      initial: v[1].parameters.reduce((result, p) => ({...result, [p.name]: p.default}), {}),
      get: () => ({...parameters.initial, ...state.test_parameters[test]}),
      edit: () => 
        h('div.parameters', [
          h('div.subsubtitle', 'Parameters'), 
          ...v[1].parameters
          .map(p => Parameter(state.test_parameters[test] && state.test_parameters[test][p.name], test, send, p))
        ]),
      result: () => h('div.parameters', [
        h('div.item', 'Parameters used:'),
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