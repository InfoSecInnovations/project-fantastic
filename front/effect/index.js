const Vis = require('./vis')

const effect = (state, action, send) => {
  if (action.type == 'init') window.onresize = e => send({type: 'render'})
  if (action.type == 'graph_container') send({type: 'date', date: Date.now() - 1000 * 60 * 30}) // by default get results from last 30 minutes
  if (action.type == 'date') {
    send({type: 'select', node: undefined})
    fetch(`/nodes?date=${action.date}`).then(res => res.json()).then(res => send({type: 'nodes', nodes: res}))
  }
  if (action.type == 'nodes') Vis(state, send)
}

module.exports = effect