export default (state, action, send) => {
  let filename = prompt('Enter file name')
  while (true) {
    if (filename === null) break
    if (filename && (!state.modules[state.selectedModule].actions || !state.modules[state.selectedModule].actions[filename])) {
      send({type: 'init_action', filename})
      send({type: 'load_action', action: state.modules[state.selectedModule].actions[filename], filename})
      send({type: 'mode', mode: 'action'})
      break
    }
    filename = prompt('Please enter a valid file name')
    filename = filename.replace(/[^a-z0-9_\-]/gi, '_').toLowerCase()
  }
}