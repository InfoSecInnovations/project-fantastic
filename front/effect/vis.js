const Vis = require('vis-network')
const NodeName = require('../util/nodename')

const graph = (state, send) => {
  const nodes = []
  const edges = []
  const get_image = os => {
    if (os) {
      if (os.toLowerCase().includes('linux')) return '/images/linux.svg'
      if (os.toLowerCase().includes('windows')) return '/images/win_new.svg' // TODO: add old windows logo for pre Win 8 versions?
      if (os.toLowerCase().includes('ios')) return '/images/apple.svg' // TODO: ios vs mac logos?
      // TODO: router icons?
    }
    return '/images/unknown.svg'
  }
  state.nodes.forEach((v, i, arr) => {
    let connection_count = 0
    v.connections.forEach(c => {
      const target_index = arr.findIndex(n => n.node_id === c.to_node)
      if (target_index == -1 || target_index == i) return
      let edge = edges.find(e => e.from == i && e.to == target_index)
      if (!edge) {
        edge = {from: i, to: target_index, connections: 1}
        edges.push(edge)
      }
      else edge.connections++
      connection_count++
    })
    const image = get_image(v.os)
    nodes.push({
      ...{
        id: i, 
        label: `${NodeName(v)}${v.access === 'local' ? ' (local host)' : ''}`,
        mass: connection_count || 1
      }, 
      ...(image && {image, shape: v.important ? 'image' : 'circularImage'}),
      ...(v.access === 'local' ? {size: 25} : undefined)
    })
  })
  const options = {
    nodes: {
      shape: 'dot',
      shapeProperties: {useBorderWithImage: true},
      size: 15,
      font: {
        color: 'white', 
        size: 16
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
      },
      imagePadding: 3
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
      solver: 'repulsion', // setting this determines which options are used below
      barnesHut: {
        centralGravity: 0.7,
        gravitationalConstant: -1200,
        springLength: 300,
        springConstant: 0.5,
        avoidOverlap: 0
      },
      repulsion: {
        centralGravity: 1,
        nodeDistance: 200,
        springLength: 300,
        springConstant: 0.5
      }
    },
    layout: {
    },
    interaction: {
      hover: true
    }
  }
  const network = new Vis.Network(state.graph_container, {
    nodes: new Vis.DataSet(nodes), 
    edges: new Vis.DataSet(edges.map(v => ({from: v.from, to: v.to, label: `${v.connections} connection${v.connections == 1 ? '' : 's'}`})))
  }, options)
  network.on('click', e => {
    send({type: 'select', edge: e.edges.length ? e.edges[0] : undefined, node: e.nodes.length ? e.nodes[0] : undefined})
  })
  network.on('hoverNode', e => send({type: 'hover_node', node: e.node}))
  network.on('blurNode', e => send({type: 'unhover_node', node: e.node}))
  network.on('hoverEdge', e => send({type: 'hover_edge', edge: e.edge}))
  network.on('blurEdge', e => send({type: 'unhover_edge', edge: e.edge}))

  send({type: 'vis', vis: network})
}

module.exports = graph