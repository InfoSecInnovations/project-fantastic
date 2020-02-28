const update = (state, action) => {
  if (action.type == 'nodes') state.nodes = action.nodes
  if (action.type == 'graph_container') state.graph_container = action.container
  if (action.type == 'select') {
    state.selected.node = action.node
    state.selected.edge = action.edge
  }
  if (action.type == 'date') state.search.date = action.date
  if (action.type == 'connection_type') state.search.connection_type = action.connection_type
  if (action.type == 'connection_state') {
    if (action.value && !state.search.connection_state.includes(action.state)) state.search.connection_state.push(action.state)
    if (!action.value) {
      const index = state.search.connection_state.findIndex(v => v === action.state)
      if (index > -1) state.search.connection_state.splice(index, 1)
    }
  }
  if (action.type == 'connection_foldout') state.search.connection_foldout = action.value
  if (action.type == 'show_external') state.search.show_external = action.value
  if (action.type == 'hover_node') {
    if (!state.hovered.nodes.find(v => v === action.node)) state.hovered.nodes.push(action.node)
  }
  if (action.type == 'unhover_node') state.hovered.nodes.splice(state.hovered.nodes.findIndex(v => v ===action.node), 1)
  if (action.type == 'clear_selection') {
    state.selected.node = undefined
    state.selected.edge = undefined
    state.hovered.nodes.length = 0
    state.search.connection_foldout = false
  }
  if (action.type == 'loading') state.loading = action.value
  if (action.type == 'vis') state.vis = action.vis
  if (action.type == 'commands') state.commands = action.commands
  if (action.type == 'enable_command') state.commands[action.command].enabled = action.enabled
  if (action.type == 'actions') state.actions = action.actions
  if (action.type == 'tab') state.tab = action.tab
  if (action.type == 'action_result') {
    if (!state.action_results[action.hostname]) state.action_results[action.hostname] = {}
    if (!state.action_results[action.hostname][action.action]) state.action_results[action.hostname][action.action] = {}
    action.result.forEach(v => {
      if (!state.action_results[action.hostname][action.action][v.id]) state.action_results[action.hostname][action.action][v.id] = {value: v.value}
      else state.action_results[action.hostname][action.action][v.id].value = v.value
    })
  }
  if (action.type == 'action_followup_result') {
    let action_result = state.action_results[action.hostname][action.action]
    for (const keys of action.keys) {
      action_result = action_result[keys.id][keys.function]
    }
    action_result = action_result[action.id]
    if (!action_result[action.function]) action_result[action.function] = {}
    action_result = action_result[action.function]
    action.result.forEach(v => {
      if (!action_result[v.id]) action_result[v.id] = {value: v.value}
      else action_result[v.id].value = v.value
    })
  }
  return state
}

module.exports = update