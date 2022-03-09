import SanitizeName from "../util/sanitizeName"

export default (state, action, send) => {
  let filename = prompt('Enter file name')
  while (true) {
    if (filename === null) break
    filename = SanitizeName(filename)
    if (filename && (!state.modules[state.selectedModule].actions || !state.modules[state.selectedModule].actions[filename])) {
      send({type: 'init_action', filename})
      send({type: 'load_action', action: state.modules[state.selectedModule].actions[filename], filename})
      send({type: 'mode', mode: 'action'})
      send({type: 'save_action'})
      break
    }
    filename = prompt('Please enter a valid file name')
  }
}