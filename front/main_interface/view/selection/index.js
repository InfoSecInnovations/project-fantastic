import {h} from 'snabbdom/h'
import Info from '../../../common/view/info'
import Actions from '../../../common/view/actions'
import ConnectionInfo from './connectioninfo'
import Multi from './multi'
import MultiActions from './multiactions'
import NodesFromEdge from '../../util/nodesfromedge'
import TabBar from './tabbar'
import SelectConnection from './selectconnection'

const get_tab = (state, send, nodes) => {
  if (state.tab == 'info') {
    if (state.selected.edge) return ConnectionInfo(state, send)
    if (nodes.length > 1) return Multi(state, send)
    return Info(state, send, state.nodes[nodes[0]])
  }
  if (state.tab == 'actions') {
    if (state.selected.edge) {
      const {from, to} = NodesFromEdge(state, state.selected.edge)
      if (state.selected.connection) return Actions(state, send, from, state.selected.connection)
      const connections = from.connections.filter(v => v.to_node === to.node_id)
      if (connections.length === 1) return Actions(state, send, from, connections[0])
      return SelectConnection(connections, send)
    }
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