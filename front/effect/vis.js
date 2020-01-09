const Vis = require('vis-network')

const graph = state => {
  const nodes = new Vis.DataSet(state.nodes.map((v, i) => ({id: i, label: v.ip})))
  const edges = new Vis.DataSet(state.nodes.reduce((result, v, i, arr) => [...result, ...v.connections.map(c => {
    const target_index = arr.findIndex(n => n.ip == c.remote_address)
    if (target_index == -1 || target_index == i) return
    return {from: i, to: target_index, label: c.process.name}
  }).filter(v => v)], []))
  const options = {
    edges: {
      arrows: 'to'
    },
    physics: {
      enabled: true
    },
    layout: {
    }
  }
  const network = new Vis.Network(state.graph_container, {nodes, edges}, options)
}

module.exports = graph