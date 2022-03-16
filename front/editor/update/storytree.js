import StoryTree from "../defaults/storytree"
import QuestConfig from '../defaults/questconfig'
import GenerateID from '@infosecinnovations/fantastic-utils/generateid'

export default (state, action) => {
  if (action.type == 'editor_node') state.storyTree.nodes[action.id] = {...action.node}
  if (action.type == 'editor_node_remove') delete state.storyTree.nodes[action.id]
  if (action.type == 'editor_select') state.storyTree.selected = action.id
  if (action.type == 'set_custom_description') state.storyTree.nodes[action.id].customDescription = action.description
  if (action.type == 'set_parameter') {
    if (!state.storyTree.nodes[action.id].parameters) state.storyTree.nodes[action.id].parameters = {}
    state.storyTree.nodes[action.id].parameters[action.key] = action.value
  }
  if (action.type == 'enable_quest_age') state.storyTree.json.selection.age.enabled = action.enabled
  if (action.type == 'set_quest_age') state.storyTree.json.selection.age[action.unit] = action.value
  if (action.type == 'save_file') state.storyTree.saveFile = action.name
  if (action.type == 'load_tree') state.storyTree.nodes = {}
  if (action.type == 'new_tree') state.storyTree = {...StoryTree(), jsplumb: state.storyTree.jsplumb}
  if (action.type == 'set_tree') {
    state.storyTree.json = {...QuestConfig(), ...action.json.questConfig}
    state.storyTree.json.name = action.json.name
    state.storyTree.json.description = action.json.description
    state.storyTree.questId = action.json.id || GenerateID()
    state.storyTree.filename = action.filename
  }
  return state
}