import {h} from 'snabbdom/h'
import Info from '../../../common/view/info'
import Actions from '../../../common/view/actions'
import ConnectionInfo from './connectioninfo'
import Multi from './multi'
import MultiActions from './multiactions'
import NodesFromEdge from '../../util/nodesfromedge'
import TabBar from './tabbar'
import CanShowActions from './canshowactions'

const get_tab = (state, send, nodes) => {
  if (state.tab == 'info' || !CanShowActions(state, nodes)) {
    if (state.selected.edge) return ConnectionInfo(state, send)
    if (nodes.length > 1) return Multi(state, send)
    return Info(state, send, state.nodes[nodes[0]])
  }
  if (state.tab == 'actions') {
    if (state.selected.connection) {
      if (nodes) return Actions(state, send, state.nodes[nodes[0]], state.selected.connection)
      const {from} = NodesFromEdge(state, state.selected.edge)
      return Actions(state, send, from, state.selected.connection)
    }
    if (!nodes) return
    if (nodes.length > 1) return MultiActions(state, send)
    return Actions(state, send, state.nodes[nodes[0]])
  }
}

export default (state, send) => {
  const nodes = state.selected.nodes && state.selected.nodes.length ? state.selected.nodes : (typeof state.selected.node != 'undefined' ? [state.selected.node] : undefined)
  if (!nodes && !state.selected.edge) return
  const tab = get_tab(state, send, nodes)
  return h('div#selection.panel', [
    TabBar(state, send, nodes),
    ...(Array.isArray(tab) ? tab : [tab])
  ])
}