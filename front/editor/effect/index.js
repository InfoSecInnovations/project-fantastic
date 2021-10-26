import EditorCanvas from './editorcanvas'
import LoadModule from './loadmodule'
import LoadTree from './loadtree'
import Save from './save'
const FS = require('fs-extra')

export default (state, action, send) => {
  if (action.type == 'editor_canvas') EditorCanvas(state, action, send)
  if (action.type == 'load_module') LoadModule(state, action, send)
  if (action.type == 'editor_node_el') {
    state.storyTree.jsplumb.makeSource(action.el, {filter: '.handle'})
    state.storyTree.jsplumb.makeTarget(action.el, {allowLoopback: false})
  }
  if (action.type == 'save') Save(state, action, send)
  if (action.type == 'load_tree') LoadTree(state, action, send)
  if (action.type == 'editor_node_remove') send({type: 'editor_select', id: null})
  if (action.type == 'load_config') {
    FS.readJSON(action.path).then(json => {
      send({type: 'set_config', config: json})
    })
  }
  if (action.type == 'save_config') {
    FS.writeJSON(action.path, state.config.json, {spaces: '\t'})
    send({type: 'config_save_file', name: Path.parse(action.path).base})
  }
}