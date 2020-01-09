const effect = (state, action, send) => {
  if (action.type == 'init') {
    fetch('/nodes').then(res => res.json()).then(res => send({type: 'nodes', nodes: res}))
  }
}

module.exports = effect