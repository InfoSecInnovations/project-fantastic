import {h} from 'snabbdom/h'
import ResultDataView from '../resultdataview'

export default (state, send, label, funcName, baseID) => {
  let data = state.action.json.functions[funcName].result
  return h('div.column', [
    h('div.row bottom-aligned', [
      h('h4', 'Data'),
      label ? h('div.label', label) : undefined,
      h('div.mini-button', {
      on: {click: e => send({type: 'add_result_data_entry', funcName})},
      attrs: {title: 'Add data item'}
    }, '+')]),
    ...(data.data ? data.data.map((d, i) => h('div.row top-aligned', [
      h('div', ResultDataView(
        state,
        send,
        funcName,
        d,
        `${baseID}-data-${i}-label`,
        ['data', i]
      )),
      h('div.mini-button', {
        on: {click: e => send({type: 'remove_result_data_entry', funcName, dataIndex: i})},
        attrs: {title: 'Remove data item'}
      }, 'X')
    ])) : [])
  ])
}