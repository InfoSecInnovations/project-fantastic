import ActionFunction from "../defaults/actionFunction"
import ActionFollowup from "../defaults/actionFollowup"
import SanitizeName from "../util/sanitizeName"
import _ from "lodash"

export default (state, action) => {

  if (action.type == 'set_action_target') state.action.json.target = action.target
  if (action.type == 'add_action_input') {
    if (!state.action.json.functions[action.function].inputs) state.action.json.functions[action.function].inputs = []
    state.action.json.functions[action.function].inputs.push({})
  }
  if (action.type == 'remove_action_input') state.action.json.functions[action.function].inputs.splice(action.index, 1)
  if (action.type == 'action_input_variable') state.action.json.functions[action.function].inputs[action.index].variable = SanitizeName(action.value)
  if (action.type == 'action_input_name') state.action.json.functions[action.function].inputs[action.index].name = action.value
  if (action.type == 'action_input_type') state.action.json.functions[action.function].inputs[action.index].type = action.value
  if (action.type == 'add_action_followup') state.action.json.functions[`function${Object.keys(state.action.json.functions).length}`] = ActionFunction()
  if (action.type == 'delete_action_function') delete state.action.json.functions[action.function]
  if (action.type == 'rename_action_function') {
    const newName = action.newName
    Object.values(state.action.json.functions).forEach(func => {
      if (func.result && func.result.followups) func.result.followups.forEach(followup => {
        if (followup.function == action.function) followup.function = newName
      })
    })
    state.action.json.functions[newName] = state.action.json.functions[action.function]
    delete state.action.json.functions[action.function]
    if (state.action.wizard.funcName == action.function) state.action.wizard.funcName = newName
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
  if (action.type == 'add_result_data_entry') {
    if (!state.action.json.functions[action.funcName].result.data) state.action.json.functions[action.funcName].result.data = []
    state.action.json.functions[action.funcName].result.data.push('')
  }
  if (action.type == 'remove_result_data_entry') state.action.json.functions[action.funcName].result.data.splice(action.dataIndex, 1)
  if (action.type == 'add_result_followup') {
    if (!state.action.json.functions[action.funcName].result.followups) state.action.json.functions[action.funcName].result.followups = []
    const newFollowup = ActionFollowup()
    newFollowup.function = Object.keys(state.action.json.functions).find(k => k != 'run')
    state.action.json.functions[action.funcName].result.followups.push(newFollowup)
  }
  if (action.type == 'remove_result_followup') state.action.json.functions[action.funcName].result.followups.splice(action.followupIndex, 1)
  if (action.type == 'set_followup_function') state.action.json.functions[action.funcName].result.followups[action.followupIndex] = action.followup
  if (action.type == 'action_followup_enabled_status') {
    if (action.value) state.action.json.functions[action.funcName].result.followups[action.followupIndex].enabled = ''
    else delete state.action.json.functions[action.funcName].result.followups[action.followupIndex].enabled
  } 
  if (action.type == 'action_followup_data_add_entry') state.action.json.functions[action.funcName].result.followups[action.followupIndex].data[`var${Object.keys(state.action.json.functions[action.funcName].result.followups[action.followupIndex].data).length}`] = ''
  if (action.type == 'action_followup_data_remove_entry') delete state.action.json.functions[action.funcName].result.followups[action.followupIndex].data[action.key]
  if (action.type == 'action_followup_data_key_rename') {
    state.action.json.functions[action.funcName].result.followups[action.followupIndex].data[SanitizeName(action.newName)] = state.action.json.functions[action.funcName].result.followups[action.followupIndex].data[action.key]
    delete state.action.json.functions[action.funcName].result.followups[action.followupIndex].data[action.key]
  }
  if (action.type == 'action_wizard_load_function') state.action.wizard.funcName = action.funcName

  return state
}