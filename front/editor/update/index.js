import StoryTree from "../defaults/storytree"
import Action from '../defaults/action'
import ActionFunction from "../defaults/actionFunction"
import ActionFollowup from "../defaults/actionFollowup"

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
  if (action.type == 'config_default_enable') state.config.json.assets.default_enable_commands.push(action.command)

  if (action.type == 'load_action') {
    state.action.json = action.action
    state.action.filename = action.filename
  } 
  if (action.type == 'init_action') {
    if (!state.modules[state.selectedModule].actions) state.modules[state.selectedModule].actions = {}
    state.modules[state.selectedModule].actions[action.filename] = Action().json
  }
  if (action.type == 'set_action') {
    if (!state.modules[state.selectedModule].actions) state.modules[state.selectedModule].actions = {}
    state.modules[state.selectedModule].actions[action.filename] = action.json
  }
  if (action.type == 'remove_action') {
    if (state.modules[state.selectedModule].actions) delete state.modules[state.selectedModule].actions[action.filename]
  }

  if (action.type == 'module_data_name') state.newModuleData.name = action.value
  if (action.type == 'module_data_display_name') state.newModuleData.displayName = action.value
  if (action.type == 'module_data_org') state.newModuleData.org = action.value

  if (action.type == 'set_action_name') state.action.json.name = action.name
  if (action.type == 'set_action_description') state.action.json.description = action.description
  if (action.type == 'enable_action_host') {
    if (action.enabled && !state.action.json.hosts.includes(action.host)) state.action.json.hosts.push(action.host)
    else {
      const index = state.action.json.hosts.findIndex(host => host == action.host)
      if (index) state.action.json.hosts.splice(index, 1)
    }
  }
  if (action.type == 'set_action_role') state.action.json.role = action.role
  if (action.type == 'add_action_input') {
    if (!state.action.json.functions[action.function].inputs) state.action.json.functions[action.function].inputs = []
    state.action.json.functions[action.function].inputs.push({})
  }
  if (action.type == 'remove_action_input') state.action.json.functions[action.function].inputs.splice(action.index, 1)
  if (action.type == 'action_input_variable') state.action.json.functions[action.function].inputs[action.index].variable = action.value
  if (action.type == 'action_input_name') state.action.json.functions[action.function].inputs[action.index].name = action.value
  if (action.type == 'action_input_type') state.action.json.functions[action.function].inputs[action.index].type = action.value
  if (action.type == 'add_action_followup') state.action.json.functions[`function${Object.keys(state.action.json.functions).length}`] = ActionFunction()
  if (action.type == 'delete_action_function') delete state.action.json.functions[action.function]
  if (action.type == 'rename_action_function') {
    Object.values(state.action.json.functions).forEach(func => {
      if (func.result && func.result.followups) func.result.followups.forEach(followup => {
        if (followup.function == action.function) followup.function = action.newName
      })
    })
    state.action.json.functions[action.newName] = state.action.json.functions[action.function]
    delete state.action.json.functions[action.function]
  }
  if (action.type == 'action_function_display_name') state.action.json.functions[action.function].name = action.name
  if (action.type == 'action_function_result_processing') {
    if (action.enabled) {
      state.action.json.functions[action.function].result = {}
    }
    else delete state.action.json.functions[action.function].result
  }
  if (action.type == 'action_function_command') state.action.json.functions[action.function].command = action.command
  if (action.type == 'action_function_command_method') state.action.json.functions[action.function].method = action.method
  if (action.type == 'action_function_convert_to_json') state.action.json.functions[action.function].json = action.value
  if (action.type == 'action_function_result_format') {
    const func = state.action.json.functions[action.function]
    if (action.value == 'array' && !func.result.array) func.result = {array: []}
    else if (action.value == 'single' && func.result.array) func.result = {}
  }
  if (action.type == 'action_function_result_array_add') state.action.json.functions[action.function].result.array.push({})
  if (action.type == 'action_function_result_array_remove') state.action.json.functions[action.function].result.array.splice(action.index, 1)
  if (action.isResultData) {
    const func = state.action.json.functions[action.funcName]
    let resultData = func.result
    for (let i = 0; i < action.path.length - 1; i++) { // we need the before last item in the path because the final item can be a string
      resultData = resultData[action.path[i]]
    }
    if (action.type == 'set_value_type') {
      let newValue = ''
      if (action.valueType == 'labelled') newValue = {labelled: ''}
      if (action.valueType == 'static') newValue = {static: ''}
      if (action.valueType == 'key_value_string') newValue = {key_value_string: ''}
      if (action.valueType == 'date') newValue = {date: ''}
      if (action.valueType == 'map') newValue = {map: {}, key: ''}
      if (action.valueType == 'bool') newValue = {bool: ''}
      if (action.valueType == 'array') newValue = []
      if (action.valueType == 'combine') newValue = {combine: []}
      if (action.valueType == 'text') newValue = {text: true}
      resultData[action.path[action.path.length - 1]] = newValue
    }
    if (action.type == 'set_string_key') resultData[action.path[action.path.length - 1]] = action.value
    if (action.type == 'set_labelled_key') resultData[action.path[action.path.length - 1]].labelled = action.value
    if (action.type == 'set_static_value') resultData[action.path[action.path.length - 1]].static = action.value
    if (action.type == 'set_key_value_string_key') resultData[action.path[action.path.length - 1]].key_value_string = action.value
    if (action.type == 'set_date_key') resultData[action.path[action.path.length - 1]].date = action.value
    if (action.type == 'set_map_key') resultData[action.path[action.path.length - 1]].key = action.key
    if (action.type == 'add_map_entry') resultData[action.path[action.path.length - 1]].map[`key${Object.keys(resultData[action.path[action.path.length - 1]].map).length}`] = ''
    if (action.type == 'remove_map_entry') delete resultData[action.path[action.path.length - 1]].map[action.key]
    if (action.type == 'set_map_from') {
      resultData[action.path[action.path.length - 1]].map[action.newFrom] = resultData[action.path[action.path.length - 1]].map[action.from]
      delete resultData[action.path[action.path.length - 1]].map[action.from]
    } 
    if (action.type == 'set_map_to') resultData[action.path[action.path.length - 1]].map[action.key] = action.to
    if (action.type == 'set_bool_key') resultData[action.path[action.path.length - 1]].bool = action.value
    if (action.type == 'set_bool_mode') {
      const boolData = resultData[action.path[action.path.length - 1]]
      if (action.value == 'value') {
        delete boolData.true
        delete boolData.false
      }
      else {
        boolData.true = ''
        boolData.false = ''
      }
    }
    if (action.type == 'set_bool_true_value') resultData[action.path[action.path.length - 1]].true = action.value
    if (action.type == 'set_bool_false_value') resultData[action.path[action.path.length - 1]].false = action.value
    if (action.type == 'set_bool_inverse') resultData[action.path[action.path.length - 1]].inverse = action.value
  }
  if (action.hasOwnProperty('resultIndex')) {
    let resultData = state.action.json.functions[action.funcName].result
    if (typeof action.resultIndex == 'number') resultData = resultData.array[action.resultIndex]
    if (action.type == 'add_result_data_entry') {
      if (!resultData.data) resultData.data = []
      resultData.data.push('')
    }
    if (action.type == 'remove_result_data_entry') resultData.data.splice(action.dataIndex, 1)
    if (action.type == 'add_result_followup') {
      if (!resultData.followups) resultData.followups = []
      const newFollowup = ActionFollowup()
      newFollowup.function = Object.keys(state.action.json.functions).find(k => k != 'run')
      resultData.followups.push(newFollowup)
    }
    if (action.type == 'remove_result_followup') resultData.followups.splice(action.followupIndex, 1)
    if (action.type == 'set_followup_function') resultData.followups[action.followupIndex] = action.followup
    if (action.type == 'action_followup_enabled_status') {
      if (action.value) resultData.followups[action.followupIndex].enabled = ''
      else delete resultData.followups[action.followupIndex].enabled
    } 
    if (action.type == 'action_followup_data_add_entry') resultData.followups[action.followupIndex].data[`key${Object.keys(resultData.followups[action.followupIndex].data).length}`] = ''
    if (action.type == 'action_followup_data_remove_entry') delete resultData.followups[action.followupIndex].data[action.key]
    if (action.type == 'action_followup_data_key_rename') {
      resultData.followups[action.followupIndex].data[action.newName] = resultData.followups[action.followupIndex].data[action.key]
      delete resultData.followups[action.followupIndex].data[action.key]
    }
  }
  if (action.type == 'action_editor_mode') state.actionEditorMode = action.mode


  return state
}