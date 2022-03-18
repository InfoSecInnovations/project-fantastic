export default (state, action) => {
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
    const index = state.config.json.assets.force_commands.indexOf(action.fullPath)
    if (index >= 0) state.config.json.assets.force_commands.splice(index, 1)
  } 
  if (action.type == 'config_remove_default_enabled') {
    const index = state.config.json.assets.default_enable_commands.indexOf(action.fullPath)
    if (index >= 0) state.config.json.assets.default_enable_commands.splice(index, 1)
  } 
  if (action.type == 'config_always_enable') state.config.json.assets.force_commands.push(action.fullPath)
  if (action.type == 'config_default_enable') state.config.json.assets.default_enable_commands.push(action.fullPath)

  return state
}