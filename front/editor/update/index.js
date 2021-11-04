import StoryTree from "../defaults/storytree"

export default (state, action) => {
  if (action.type == 'mode') state.mode = action.mode
  if (action.type == 'editor_jsplumb') state.storyTree.jsplumb = action.instance
  if (action.type == 'load_module_menu') state.module_menu = action.enabled
  if (action.type == 'add_module') state.modules[action.module.name] = action.module
  if (action.type == 'unload_module') delete state.modules[action.module]
  if (action.type == 'select_module') state.selectedModule = action.module
  if (action.type == 'dropdown_state') state.dropdownState = action.state

  if (action.type == 'editor_node') state.storyTree.nodes[action.id] = {...action.node}
  if (action.type == 'editor_node_remove') delete state.storyTree.nodes[action.id]
  if (action.type == 'editor_select') state.storyTree.selected = action.id
  if (action.type == 'set_custom_description') state.storyTree.nodes[action.id].customDescription = action.description
  if (action.type == 'set_parameter') {
    if (!state.storyTree.nodes[action.id].parameters) state.storyTree.nodes[action.id].parameters = {}
    state.storyTree.nodes[action.id].parameters[action.key] = action.value
  }
  if (action.type == 'enable_quest_age') state.storyTree.config.selection.age.enabled = action.enabled
  if (action.type == 'set_quest_age') state.storyTree.config.selection.age[action.unit] = action.value
  if (action.type == 'enable_quest_host_type') {
    if (action.enabled && !state.storyTree.config.hosts.includes(action.host)) state.storyTree.config.hosts.push(action.host)
    else {
      const index = state.storyTree.config.hosts.findIndex(host => host == action.host)
      if (index) state.storyTree.config.hosts.splice(index, 1)
    }
  }
  if (action.type == 'set_quest_description') state.storyTree.description = action.description
  if (action.type == 'set_quest_name') state.storyTree.name = action.name
  if (action.type == 'set_quest_role') state.storyTree.config.role = action.role
  if (action.type == 'save_file') state.storyTree.saveFile = action.name
  if (action.type == 'load_tree') state.storyTree.nodes = {}
  if (action.type == 'new_tree') state.storyTree = {...StoryTree(), jsplumb: state.storyTree.jsplumb}

  if (action.type == 'set_config') state.config.json = action.config
  if (action.type == 'config_save_file') state.config.saveFile = action.name
  if (action.type == 'config_port') state.config.json.port = action.value
  if (action.type == 'config_use_child_process') state.config.json.use_child_process = action.value
  if (action.type == 'config_node_count_warning') state.config.json.client.nodeCountWarning = action.value
  if (action.type == 'config_remove_module') {
    state.config.json.assets.packages.splice(state.config.json.assets.packages.indexOf(action.module), 1)
    state.config.json.assets.force_commands = state.config.json.assets.force_commands.filter(item => !item.startsWith(action.module))
    state.config.json.assets.default_enable_commands = state.config.json.assets.default_enable_commands.filter(item => !item.startsWith(action.module))
  }
  if (action.type == 'config_add_module') state.config.json.assets.packages.push(action.module)
  if (action.type == 'config_remove_always_enabled') {
    const index = state.config.json.assets.force_commands.indexOf(action.command)
    if (index >= 0) state.config.json.assets.force_commands.splice(index, 1)
  } 
  if (action.type == 'config_remove_default_enabled') {
    const index = state.config.json.assets.default_enable_commands.indexOf(action.command)
    if (index >= 0) state.config.json.assets.default_enable_commands.splice(index, 1)
  } 
  if (action.type == 'config_always_enable') state.config.json.assets.force_commands.push(action.command)

  return state
}