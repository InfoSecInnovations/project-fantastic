import CreateModule from './createmodule'
import EditorCanvas from './editorcanvas'
import LoadModule from './loadmodule'
import LoadTree from './loadtree'
import Save from './save'
const FS = require('fs-extra')

export default (state, action, send) => {
  if (action.type == 'init') {
    window.onclick = e => {
      // if the clicked item isn't a dropdown or the child of a dropdown, clear dropdown state
      const dropdown = e.target.closest('.dropdown, .dropdown-trigger')
      if (!dropdown) send({type: 'dropdown_state', state: null})
    }
    const savedModules = localStorage.getItem('modulePaths')
    if (savedModules) {
      const savedModuleData = JSON.parse(savedModules)
      Object.values(savedModuleData).forEach(v => LoadModule(state, {module: v}, send, false))
    }
  } 
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
  if (action.type == 'config_add_module') send({type: 'dropdown_state', state: null})
  if (action.type == 'config_always_enable') {
    send({type: 'dropdown_state', state: null})
    send({type: 'config_remove_default_enabled', command: action.command})
  } 
  if (action.type == 'config_default_enable') {
    send({type: 'dropdown_state', state: null})
    send({type: 'config_remove_always_enabled', command: action.command})
  } 
  if (action.type == 'create_new_module') CreateModule(state, action, send)
}