import {h} from 'snabbdom/h'
import DateSelect from './dateselect'
import ShowNodes from './shownodes'
import ConnectionType from './connectiontype'
import ConnectionState from './connectionstate'

export default (state, send) => {
  if (!state.nodes) return h('div')
  return h('div#search', [
    DateSelect(state, send),
    ShowNodes(state, send),
    ConnectionType(state, send),
    ConnectionState(state, send),
    h('div.button', {on: {click: [send, {type: 'search'}]}}, 'Search')
  ])
}