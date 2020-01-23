const Vis = require('./vis')

const effect = (state, action, send) => {
  if (action.type == 'init') window.onresize = e => send({type: 'render'})
  if (action.type == 'nodes') {
    send({type: 'clear_selection'})
    send({type: 'loading', value: false})
    Vis(state, send)
  }
  if (action.type == 'search' || action.type == 'graph_container') {
    send({type: 'loading', value: true})
    send({type: 'clear_selection'})
    fetch(`/nodes?date=${!state.search.date ? 0 : Date.now() - state.search.date * 60 * 1000}&connection_type=${state.search.connection_type}&connection_state=${state.search.connection_state}`).then(res => res.json()).then(res => send({type: 'nodes', nodes: res}))
  }
}

module.exports = effect