const Vis = require('./vis')

const effect = (state, action, send) => {
  if (action.type == 'init') window.onresize = e => send({type: 'render'})
  if (action.type == 'date' || action.type == 'connection_type' || action.type == 'graph_container') {
    send({type: 'select', node: undefined})
    fetch(`/nodes?date=${Date.now() - state.search.date * 60 * 1000}&connection_type=${state.search.connection_type}`).then(res => res.json()).then(res => send({type: 'nodes', nodes: res}))
  }
  if (action.type == 'nodes') Vis(state, send)
}

module.exports = effect