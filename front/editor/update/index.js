export default (state, action) => {
  if (action.type == 'mode') state.mode = action.mode
  if (action.type == 'editor_jsplumb') state.editor.jsplumb = action.instance
  if (action.type == 'load_module_menu') state.module_menu = action.enabled
  if (action.type == 'add_module') state.modules[action.module.name] = action.module
  if (action.type == 'editor_node') state.editor.nodes[action.id] = {...action.node}
  if (action.type == 'editor_node_remove') delete state.editor.nodes[action.id]
  if (action.type == 'editor_select') state.editor.selected = action.id
  if (action.type == 'set_custom_description') state.editor.nodes[action.id].customDescription = action.description
  if (action.type == 'set_parameter') {
    if (!state.editor.nodes[action.id].parameters) state.editor.nodes[action.id].parameters = {}
    state.editor.nodes[action.id].parameters[action.key] = action.value
  }
  return state
}