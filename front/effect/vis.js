const Vis = require('vis-network')

const graph = (state, send) => {
  const nodes = new Vis.DataSet(state.nodes.map((v, i) => ({id: i, label: v.hostname || (v.ips && v.ips.length && v.ips[0])})))
  const edges = []
  state.nodes.forEach((v, i, arr) => {
    v.connections.forEach(c => {
      const target_index = arr.findIndex(n => n.ips.find(v => v === c.remote_address))
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
    nodes: {
      shape: 'dot',
      size: 15,
      font: {
        color: 'white', 
        size: 16,
        background: 'black'
      },
      borderWidth: 2,
      borderWidthSelected: 1,
      color: {
        border: 'coral',
        background: 'orangered',
        highlight: {
          border: 'lightsteelblue',
          background: 'steelblue'
        }
      }
    },
    edges: {
      arrows: 'to',
      font: {
        color: 'white',
        strokeWidth: 0
      }
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
    send({type: 'select', node: e.nodes.length ? e.nodes[0] : undefined})
  })
}

module.exports = graph