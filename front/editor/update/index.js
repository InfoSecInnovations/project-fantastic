export default (state, action) => {
  if (action.type == 'mode') state.mode = action.mode
  if (action.type == 'editor_jsplumb') state.editor.jsplumb = action.instance
  if (action.type == 'load_module_menu') state.module_menu = action.enabled
  if (action.type == 'add_module') state.modules[action.module.name] = action.module
  if (action.type == 'unload_module') delete state.modules[action.module]
  if (action.type == 'editor_node') state.editor.nodes[action.id] = {...action.node}
  if (action.type == 'editor_node_remove') delete state.editor.nodes[action.id]
  if (action.type == 'editor_select') state.editor.selected = action.id
  if (action.type == 'set_custom_description') state.editor.nodes[action.id].customDescription = action.description
  if (action.type == 'set_parameter') {
    if (!state.editor.nodes[action.id].parameters) state.editor.nodes[action.id].parameters = {}
    state.editor.nodes[action.id].parameters[action.key] = action.value
  }
  if (action.type == 'enable_quest_age') state.editor.config.selection.age.enabled = action.enabled
  if (action.type == 'set_quest_age') state.editor.config.selection.age[action.unit] = action.value
  if (action.type == 'enable_quest_host_type') {
    if (action.enabled && !state.editor.config.hosts.includes(action.host)) state.editor.config.hosts.push(action.host)
    else {
      const index = state.editor.config.hosts.findIndex(host => host == action.host)
      if (index) state.editor.config.hosts.splice(index, 1)
    }
  }
  if (action.type == 'set_quest_description') state.editor.description = action.description
  if (action.type == 'set_quest_name') state.editor.name = action.name
  if (action.type == 'set_quest_role') state.editor.config.role = action.role
  if (action.type == 'save_file') state.editor.saveFile = action.name
  if (action.type == 'load_tree') state.editor.nodes = {}
  return state
}