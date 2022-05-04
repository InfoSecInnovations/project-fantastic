import {h} from 'snabbdom/h'

export default (state, send, index, searchIndex) => {
  const action = state.scan.json.actions[index]
  const search = action.search[searchIndex]
  return h('div', [
    h('div.row', [
      h('label.label', {attrs: {for: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-label`}}, 'Label'),
      h('input', {
        attrs: {id: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-label`},
        props: {value: search.label || ''},
        on: {input: e => send({type: 'set_scan_search_item_label', index, searchIndex, value: e.target.value})}
      })
    ]),
    h('div.label', 'Search for a result entry with this label')
  ])
}