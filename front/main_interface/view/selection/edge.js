import {h} from 'snabbdom/h'
const Connections = require('../../../common/view/connections')
const NodeName = require('../../../common/util/nodename')
import NodesFromEdge from '../../util/nodesfromedge'

export default (state, send) => {
  const {from, to, from_id, to_id} = NodesFromEdge(state, state.selected.edge)
  return h('div.scroll_container', [
    ...Connections(from.connections.filter(v => v.to_node === to.node_id), [
      'Connections from ', 
      h('a', {
        on: {click: [
          [send, {type: 'vis_select', node: from_id}],
          [send, {type: 'select', node: from_id}]
        ]}
      }, NodeName(from)), 
      ' to ', 
      h('a', {
        on: {click: [
          [send, {type: 'vis_select', node: to_id}],
          [send, {type: 'select', node: to_id}]
        ]}
      }, NodeName(to))
    ])
  ])
}