
export default (state, action) => {
  if (action.type == 'editor_node') state.storyTree.json.nodeData[action.id] = {...action.node}
  if (action.type == 'editor_node_remove') delete state.storyTree.json.nodeData[action.id]
  if (action.type == 'editor_select') state.storyTree.selected = action.id
  if (action.type == 'set_custom_description') state.storyTree.json.nodeData[action.id].customDescription = action.description
  if (action.type == 'set_parameter') {
    if (!state.storyTree.json.nodeData[action.id].parameters) state.storyTree.json.nodeData[action.id].parameters = {}
    state.storyTree.json.nodeData[action.id].parameters[action.key] = action.value
  }
  if (action.type == 'enable_quest_age') state.storyTree.json.selection.age.enabled = action.enabled
  if (action.type == 'set_quest_age') state.storyTree.json.selection.age[action.unit] = action.value
  return state
}