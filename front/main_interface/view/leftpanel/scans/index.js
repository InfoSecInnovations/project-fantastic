import {h} from 'snabbdom/h'
import Parameter from './parameter'
import SearchBar from '@infosecinnovations/fantastic-front/view/searchbar'
import FilterSearchResults from '@infosecinnovations/fantastic-front/util/filtersearchresults'
import Info from '@infosecinnovations/fantastic-front/view/scan/info'
import PlayButton from '@infosecinnovations/fantastic-front/view/scan/playbutton'
import Result from '@infosecinnovations/fantastic-front/view/scan/result'
import ProcessResults from '@infosecinnovations/fantastic-front/view/scan/processresults'
import DefaultParameters from '@infosecinnovations/fantastic-utils/defaultparameters'
import NodeLink from '@infosecinnovations/fantastic-front/view/scan/nodelink'
import TopLevelFoldout from '@infosecinnovations/fantastic-front/view/toplevelfoldout'

const scanItem = (state, send, scan, data) => {
  const id = `${scan}-foldout`
  const result_date = state.scan_results.date[scan]
  const result_data = state.scan_results.data[scan]
  const result_approval = state.scan_results.approval[scan]
  const results = result_date > Date.now() - 1000 * 60 * 60 * 24 && result_data // TODO: maybe we want to be able to define a custom maximum result age
  const {pass, failed_nodes, status} = ProcessResults(state, data, results, result_approval)
  const parameters = data.parameters && {...DefaultParameters(data), ...state.scan_parameters[scan]}
  const valid_parameters = !parameters || Object.values(parameters).every(v => (typeof v === 'number' && !isNaN(v) && isFinite(v)) || typeof v === 'boolean' || v)
  return h('div.scroll_item spaced', {
    hook: {
      insert: (vnode) => {
        if (scan == state.selected_item) {
          vnode.elm.scrollIntoView()
          setTimeout(e => send({type: 'select_item', item: null}))
        } 
      }
    },
    key: id
  }, [
    h('input.auto_foldout', {
      attrs: {type: 'checkbox', id, checked: state.foldout_checkboxes[id]},
      on: {input: e => send({type: 'foldout_checkbox', id, value: e.target.checked})}
    }),
    ...Info(
      state, 
      send,
      data, 
      parameters,
      status == 'pending' ? null : status,
      id
    ),
    h('div.foldout_child', [
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
          state,
          send, 
          data,
          result_date,
          pass,
          state.scan_results.parameters[scan],
          failed_nodes,
          {
            event_type: 'scans',
            history_item: state.scan_results.history_items[scan],
            review_name: scan,
            result_data: results,
            result_info: [
              data.parameters && h('div.parameters', [
                'Parameters used:',
                h('ul', Object.entries(state.scan_results.parameters[scan]).map(v => h('li', `${v[0]}: ${v[1]}`)))
              ]),
              NodeLink(send, state.scan_results.data[scan].map(v => v.node_id), result_date, state.scan_results.age[scan])
            ],
            scan_id: state.scan_results.scan_ids[scan]
          }
        )
      : [])
    ])
  ])
}

export default (state, send) => {
  const scans = Object.entries(FilterSearchResults(state, 'scans'))
  return h('div.scroll_container', [
    h('h2.panel_title', 'Scans'),
    SearchBar(send, 'scans'),
    h('div.scroll spaced',
      Object.entries(state.module_info).filter(v => scans.find(s => s[1].module == v[0])).map(v => {
        const id = `${v[0]}-scans-foldout`
        return TopLevelFoldout(state, send, id, h('div.module_header', v[1].name), [
          ...scans.filter(s => s[1].module == v[0] && state.favorites.scans && state.favorites.scans[s[0]]).map(s => scanItem(state, send, s[0], s[1])),
          ...scans.filter(s => s[1].module == v[0] && (!state.favorites.scans || !state.favorites.scans[s[0]])).map(s => scanItem(state, send, s[0], s[1]))
        ])
      })
    )
  ])
}