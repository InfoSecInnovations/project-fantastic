import EditorCanvas from './editorcanvas'
import LoadModule from './loadmodule'
import LoadTree from './loadtree'
import Save from './save'

export default (state, action, send) => {
  if (action.type == 'editor_canvas') EditorCanvas(state, action, send)
  if (action.type == 'load_module') LoadModule(state, action, send)
  if (action.type == 'editor_node') send({type: 'editor_select', id: action.id})
  if (action.type == 'editor_node_el') {
    state.editor.jsplumb.makeSource(action.el, {filter: '.handle'})
    state.editor.jsplumb.makeTarget(action.el, {allowLoopback: false})
  }
  if (action.type == 'editor_node_remove_el') state.editor.jsplumb.unmanage(action.id)
  if (action.type == 'save') Save(state, action, send)
  if (action.type == 'load_tree') LoadTree(state, action, send)
  if (action.type == 'editor_node_remove') send({type: 'editor_select', id: null})
}