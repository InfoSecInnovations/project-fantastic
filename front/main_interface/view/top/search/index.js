import {h} from 'snabbdom/h'
import DateSelect from './dateselect'
import ShowNodes from './shownodes'
import ConnectionType from './connectiontype'
import ConnectionState from './connectionstate'

export default (state, send) => {
  return h('div#search', [
    DateSelect(state, send),
    ShowNodes(state, send),
    ConnectionType(state, send),
    ConnectionState(state, send),
    h('div.search_buttons', [
      h('div.button', {on: {click: e => send({type: 'search'})}}, 'Search'),
      h('div.button', {on: {click: e => send({type: 'save_search_dialog', state: 'enabled'})}}, 'Save Filters')
    ])

  ])
}