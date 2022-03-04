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
  return `${changed ? '* ' : ''}${toolName ? `${toolName} - ` : ''}${baseName}`
}