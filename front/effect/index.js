const Vis = require('./vis')

const effect = (state, action, send) => {
  if (action.type == 'init') window.onresize = e => send({type: 'render'})
  if (action.type == 'graph_container') fetch('/nodes').then(res => res.json()).then(res => send({type: 'nodes', nodes: res}))
  if (action.type == 'nodes') Vis(state, send)
}

module.exports = effect