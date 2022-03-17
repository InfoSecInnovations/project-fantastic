import {h} from 'snabbdom/h'
import Info from '../common/info'
import Actions from './elements/actions'
import Parameters from './elements/parameters'

export default (state, send) => h('div#scan-editor.panel editor-scroll', [
  h('div.column', Info(state, send, 'scan')),
  h('div.column', [
    Parameters(state, send),
    Actions(state, send)
  ])
])