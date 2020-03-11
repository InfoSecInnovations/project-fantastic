const H = require('snabbdom/h').default
const DefaultIPs = require('fantastic-utils/defaultips')
const NodesFromEdge = require('../util/nodesfromedge')
const NodeName = require('../../common/util/nodename')

const style = pos => ({left: `${pos.x}px`, bottom: `calc(100% - ${pos.y - 16}px)`})

const tooltip = state => {
  if (state.hovered.ui || !state.vis) return
  if (state.hovered.nodes.length) {
    const node_id = state.hovered.nodes[state.hovered.nodes.length - 1]
    const node = state.nodes[node_id]
    const box = state.vis.getBoundingBox(node_id)
    const positions = state.vis.getPositions(node_id)
    const pos = state.vis.canvasToDOM({x: positions[node_id].x, y: box.top})
    return H('div#tooltip', {style: style(pos)}, [
      H('div', NodeName(node)),
      node.macs && node.macs.length ? H('div', `MAC: ${node.macs[0].mac}`) : undefined,
      node.os ? H('div', node.os) : undefined,
      H('div', `${(node.connections && node.connections.length) || 0} connection${node.connections && node.connections.length === 1 ? '' : 's'}`)
    ])
  }
  if (state.hovered.edges.length) {
    const {from, to, from_id, to_id} = NodesFromEdge(state, state.hovered.edges[state.hovered.edges.length - 1])
    const positions = state.vis.getPositions([from_id, to_id])
    const pos = state.vis.canvasToDOM({x: (positions[from_id].x + positions[to_id].x) / 2, y: Math.min(positions[from_id].y, positions[to_id].y)})
    const connections = from.connections.filter(v => v.to_node === to.node_id)
    return H('div#tooltip', {style: style(pos)}, [
      H('div', `${connections.length} connection${connections.length == 1 ? '' : 's'} from ${NodeName(from)} to ${NodeName(to)}`)
    ])
  }
}

module.exports = tooltip