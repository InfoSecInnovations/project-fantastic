const mode_mappings = {
  action: 'Action Editor',
  module: 'Module Editor',
  install: 'Installation Manager',
  config: 'Configuration Editor',
  storytree: 'Story Tree Editor',
  new_module: 'Create New Module'
}

export default state => {
  const baseName = 'Fantastic Tools'
  const toolName = mode_mappings[state.mode]
  let changed
  if (state.mode == 'action' && state.action.changed) changed = true
  let currentItem
  if (state.mode == 'action' || state.mode == 'module' || state.mode == 'storytree') {
    if (state.selectedModule) {
      const module = state.modules[state.selectedModule]
      currentItem = (module.info && module.info.name) || module.name
    }
    if (state.mode == 'action' && state.action && state.action.filename) currentItem = `${state.action.json.name || state.action.filename} - ${currentItem}`
  }
  return `${changed ? '* ' : ''}${toolName ? `${toolName} - ` : ''}${currentItem ? `${currentItem} - ` : ''}${baseName}`
}