const Vis = require('vis-network')

const graph = (state, send) => {
  const nodes = new Vis.DataSet(state.nodes.map((v, i) => ({id: i, label: `${v.hostname} (${v.ipv4 || v.ipv6})`})))
  const edges = []
  state.nodes.forEach((v, i, arr) => {
    v.connections.forEach(c => {
      const target_index = arr.findIndex(n => n.ip == c.remote_address)
      if (target_index == -1 || target_index == i) return
      let edge = edges.find(e => e.from == i && e.to == target_index)
      if (!edge) {
        edge = {from: i, to: target_index, connections: 1}
        edges.push(edge)
      }
      else edge.connections++
    })
  })
  const options = {
    edges: {
      arrows: 'to'
    },
    physics: {
      enabled: true,
      barnesHut: {
        centralGravity: 0.6,
        gravitationalConstant: -5000,
        springLength: 200
      }
    },
    layout: {
    }
  }
  const network = new Vis.Network(state.graph_container, {nodes, edges: new Vis.DataSet(edges.map(v => ({from: v.from, to: v.to, label: `${v.connections} connection${v.connections == 1 ? '' : 's'}`})))}, options)
  network.on('click', e => {
    const node = e.nodes.length && e.nodes[0]
    if (node !== undefined) send({type: 'select', node})
  })
}

module.exports = graph