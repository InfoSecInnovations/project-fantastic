import _ from "lodash"
import SetItem from "./setitem"
import Action from "./action"
import Config from "./config"
import StoryTree from "./storytree"
import Scan from "./scan"

export default (state, action) => {
  if (action.type == 'set_mode') state.mode = action.mode
  if (action.type == 'editor_jsplumb') state.storyTree.jsplumb = action.instance
  if (action.type == 'load_module_menu') state.module_menu = action.enabled
  if (action.type == 'dropdown_state') state.dropdownState = action.state

  if (action.type == 'add_module') state.modules[action.module.name] = action.module
  if (action.type == 'unload_module') delete state.modules[action.module]
  if (action.type == 'select_module') state.selectedModule = action.module
  if (action.type == 'module_data_name') state.newModuleData.name = action.value
  if (action.type == 'module_data_display_name') state.newModuleData.displayName = action.value
  if (action.type == 'module_data_org') state.newModuleData.org = action.value
  if (action.type == 'set_module_display_name') {
    if (!state.modules[state.selectedModule].info) state.modules[state.selectedModule].info = {}
    state.modules[state.selectedModule].info.name = action.value
  } 
  if (action.type == 'set_module_package_name') state.modules[state.selectedModule].name = action.value
  if (action.type == 'update_module_name') {
    const newName = state.modules[state.selectedModule].name
    state.modules[newName] = state.modules[state.selectedModule]
    delete state.modules[state.selectedModule]
    state.selectedModule = newName
  }

  if (action.type == 'load_scan') {
    state.scan.json = action.scan
    state.scan.previousJson = _.cloneDeep(state.scan.json)
    state.scan.changed = false
    state.scan.filename = action.filename
    // TODO: wizard
  } 

  state = StoryTree(state, action)
  state = Config(state, action)
  state = Action(state, action)
  state = SetItem(state, action)
  state = Scan(state, action)
  return state
}