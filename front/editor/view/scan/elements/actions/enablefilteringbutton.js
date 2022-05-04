import {h} from 'snabbdom/h'

export default (state, send, index, searchIndex) => {
  const action = state.scan.json.actions[index]
  const search = action.search[searchIndex]
  return h('div.button', {
    on: {click: e => send({type: 'enable_scan_search_item_filtering', enabled: !search.filter, index, searchIndex})}
  }, `${search.filter ? 'Disable' : 'Enable'} further filtering on this result data.`)
}