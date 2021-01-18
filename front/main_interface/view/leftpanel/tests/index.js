import {h} from 'snabbdom/h'
import Parameter from './parameter'
import SearchBar from '@infosecinnovations/fantastic-front/view/searchbar'
import FilterSearchResults from '@infosecinnovations/fantastic-front/util/filtersearchresults'
import Info from '@infosecinnovations/fantastic-front/view/test/info'
import PlayButton from '@infosecinnovations/fantastic-front/view/test/playbutton'
import Result from '@infosecinnovations/fantastic-front/view/test/result'
import ProcessResults from '@infosecinnovations/fantastic-front/view/test/processresults'
import DefaultParameters from '@infosecinnovations/fantastic-utils/defaultparameters'

export default (state, send) => {
  const tests = FilterSearchResults(state, 'tests')
  return h('div.scroll_container', [
    h('h2.panel_title', 'Tests'),
    SearchBar(send, 'tests'),
    h('div.scroll spaced', Object.entries(tests).map(v => {
      const test = v[0]
      const data = v[1]
      const result_date = state.test_results.date[test]
      const result_data = state.test_results.data[test]
      const result_approval = state.test_results.approval[test]
      const results = result_date > Date.now() - 1000 * 60 * 60 * 24 && result_data // TODO: maybe we want to be able to define a custom maximum result age
      const {pass, failed_nodes, status} = ProcessResults(state, data, results, result_approval)
      const parameters = data.parameters && {...DefaultParameters(data), ...state.test_parameters[test]}
      const valid_parameters = !parameters || Object.values(parameters).every(v => (typeof v === 'number' && !isNaN(v) && isFinite(v)) || typeof v === 'boolean' || v)
      return h('div.scroll_item spaced', [
        ...Info(
          state, 
          data, 
          parameters,
          status
        ),
        ...PlayButton(
          state.test_results.status[test] === 'loading' ? 'loading' : valid_parameters ? {on: {click: e => send({type: 'run_test', test, parameters})}} : {class: {waiting: true}}, 
          data.parameters && h('div.parameters', [
            h('h4', 'Parameters'), 
            ...data.parameters
            .map(p => Parameter(state.test_parameters[test] && state.test_parameters[test][p.name], test, send, p))
          ])
        ),
        ...(results ? 
          Result(
            send, 
            data,
            result_date,
            pass,
            state.test_results.parameters[test],
            data.parameters && h('div.parameters', [
              'Parameters used:',
              h('ul', Object.entries(state.test_results.parameters[test]).map(v => h('li', `${v[0]}: ${v[1]}`)))
            ]),
            failed_nodes,
            {
              review_type: 'tests',
              review_name: test,
              review_results: results,
              result_info: data.parameters && h('div.parameters', [
                'Parameters used:',
                h('ul', Object.entries(state.test_results.parameters[test]).map(v => h('li', `${v[0]}: ${v[1]}`)))
              ])
            }
          )
        : [])
      ])
    }))
  ])
}