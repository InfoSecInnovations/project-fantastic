import {h} from 'snabbdom/h'
import Info from '@infosecinnovations/fantastic-front/view/info'
import Actions from '@infosecinnovations/fantastic-front/view/actions'

export default (state, send) => 
  h('body', h('div#container', state.node_data ? [
    h('div.column', [
      h('h2', 'Info'),
      Info(state, send, state.node_data)
    ]),
    h('div.column', [
      h('h2', 'Actions'),
      Actions(state, send, state.node_data)
    ])
  ] : h('div.title', 'Loading data...')))