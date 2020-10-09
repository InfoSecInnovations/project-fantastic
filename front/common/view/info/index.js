import {h} from 'snabbdom/h'
import NodeTop from './nodetop'
import Connections from '../connections'

export default (state, send, node) => h('div.scroll_container', [
    NodeTop(node),
    ...Connections(state, send, node.connections)
  ])