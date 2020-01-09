const effect = (state, action, send) => {
  if (action.type == 'init') {
    fetch('/nodes').then(res => res.json()).then(res => send({type: 'nodes', nodes: res}))
    window.onresize = e => send({type: 'render'})
  }
}

module.exports = effect