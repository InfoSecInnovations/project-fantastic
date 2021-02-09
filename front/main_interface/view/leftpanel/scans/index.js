import {h} from 'snabbdom/h'
import Parameter from './parameter'
import SearchBar from '@infosecinnovations/fantastic-front/view/searchbar'
import FilterSearchResults from '@infosecinnovations/fantastic-front/util/filtersearchresults'
import Info from '@infosecinnovations/fantastic-front/view/scan/info'
import PlayButton from '@infosecinnovations/fantastic-front/view/scan/playbutton'
import Result from '@infosecinnovations/fantastic-front/view/scan/result'
import ProcessResults from '@infosecinnovations/fantastic-front/view/scan/processresults'
import DefaultParameters from '@infosecinnovations/fantastic-utils/defaultparameters'

export default (state, send) => {
  const scans = FilterSearchResults(state, 'scans')
  return h('div.scroll_container', [
    h('h2.panel_title', 'Scans'),
    SearchBar(send, 'scans'),
    h('div.scroll spaced', Object.entries(scans).map(v => {
      const scan = v[0]
      const data = v[1]
      const result_date = state.scan_results.date[scan]
      const result_data = state.scan_results.data[scan]
      const result_approval = state.scan_results.approval[scan]
      const results = result_date > Date.now() - 1000 * 60 * 60 * 24 && result_data // TODO: maybe we want to be able to define a custom maximum result age
      const {pass, failed_nodes, status} = ProcessResults(state, data, results, result_approval)
      const parameters = data.parameters && {...DefaultParameters(data), ...state.scan_parameters[scan]}
      const valid_parameters = !parameters || Object.values(parameters).every(v => (typeof v === 'number' && !isNaN(v) && isFinite(v)) || typeof v === 'boolean' || v)
      return h('div.scroll_item spaced', [
        ...Info(
          state, 
          data, 
          parameters,
          status
        ),
        ...PlayButton(
          state.scan_results.status[scan] === 'loading' ? 'loading' : valid_parameters ? {on: {click: e => send({type: 'run_scan', scan, parameters})}} : {class: {waiting: true}}, 
          data.parameters && h('div.parameters', [
            h('h4', 'Parameters'), 
            ...data.parameters
            .map(p => Parameter(state.scan_parameters[scan] && state.scan_parameters[scan][p.name], scan, send, p))
          ])
        ),
        ...(results ? 
          Result(
            send, 
            data,
            result_date,
            pass,
            state.scan_results.parameters[scan],
            failed_nodes,
            {
              review_type: 'scans',
              review_name: scan,
              review_results: results,
              result_info: data.parameters && h('div.parameters', [
                'Parameters used:',
                h('ul', Object.entries(state.scan_results.parameters[scan]).map(v => h('li', `${v[0]}: ${v[1]}`)))
              ]),
              scan_id: state.scan_results.scan_ids[scan]
            }
          )
        : [])
      ])
    }))
  ])
}