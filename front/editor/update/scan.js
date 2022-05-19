import scanAction from "../defaults/scanAction"
import ScanQuest from "../defaults/scanQuest"
import ItemFromKey from "../util/itemfromkey"
import ModuleFromKey from "../util/modulefromkey"

export default (state, action) => {
  if (action.type == 'add_scan_parameter') {
    if (!state.scan.json.parameters) state.scan.json.parameters = []
    state.scan.json.parameters.push({name: `param${state.scan.json.parameters.length}`, type: 'text', default: ''})
  }
  if (action.type == 'scan_parameter_name') {
    state.scan.json.parameters[action.index].name = action.value
  }
  if (action.type == 'scan_parameter_type') {
    if (action.value != state.scan.json.parameters[action.index].type) {
      if (action.value == 'number') {
        const defaultValue = parseFloat(state.scan.json.parameters[action.index].default)
        state.scan.json.parameters[action.index].default = isNaN(defaultValue) ? '' : defaultValue
      }
      else if (action.value == 'text') {
        state.scan.json.parameters[action.index].default = `${state.scan.json.parameters[action.index].default}`
      }
      else state.scan.json.parameters[action.index].default = ''
      state.scan.json.parameters[action.index].type = action.value
    }
  }
  if (action.type == 'scan_parameter_default') {
    if (action.value == 'number') {
      const defaultValue = parseFloat(action.value)
      state.scan.json.parameters[action.index].default = isNaN(defaultValue) ? '' : defaultValue
    }
    state.scan.json.parameters[action.index].default = action.value
  }
  if (action.type == 'add_scan_action') {
    if (!state.scan.json.actions) state.scan.json.actions = []
    state.scan.json.actions.push(scanAction())
  }
  if (action.type == 'remove_scan_action') {
    state.scan.json.actions.splice(action.index, 1)
  }
  if (action.type == 'scan_action_path') state.scan.json.actions[action.index].path = action.path
  if (action.type == 'add_scan_search_item') {
    const actionData = state.scan.json.actions[action.index]
    if (!actionData.search) actionData.search = []
    actionData.search.push({})
  }
  if (action.type == 'remove_scan_search_item') {
    state.scan.json.actions[action.index].search.splice(action.searchIndex, 1)
  }
  if (action.hasOwnProperty('searchIndex')) {
    const searchData = state.scan.json.actions[action.index].search[action.searchIndex]
    if (action.type == 'scan_search_item_mode') {
      if (action.value == 'followup') {
        if (!searchData.hasOwnProperty('followup')) {
          searchData.followup = ''
          const actionData = state.scan.json.actions[action.index]
          const module = ModuleFromKey(state, actionData.path)
          const actionName = ItemFromKey(actionData.path)
          const data = module && actionName && module.actions && module.actions[actionName]
          const followups = data && data.functions && data.functions.run && data.functions.run.result && data.functions.run.result.followups
          if (followups && followups.length) searchData.followup = followups[0].function
          delete searchData.filter
          delete searchData.label
        } 
      }
      else {
        if (searchData.hasOwnProperty('followup')) {
          delete searchData.followup
          delete searchData.filter
        } 
      }
    }
    if (action.type == 'set_scan_search_item_label') searchData.label = action.value
    if (action.type == 'enable_scan_search_item_filtering') {
      if (action.enabled && !searchData.filter) searchData.filter = {}
      if (!action.enabled) delete searchData.filter
    }
    if (action.type == 'add_scan_search_item_filter_entry') searchData.filter[`key${Object.keys(searchData.filter).length}`] = ''
    if (action.type == 'rmove_scan_search_item_filter_entry') delete searchData.filter[action.key]
    if (action.type == 'scan_search_item_rename_filter_key') {
      searchData.filter[action.newKey] = searchData.filter[action.key]
      delete searchData.filter[action.key]
    }
    if (action.type == 'scan_search_item_filter_expression') searchData.filter[action.key] = action.value
    if (action.type == 'set_scan_search_item_followup') searchData.followup = action.value
    if (action.type == 'set_scan_search_item_followup_status') {
      if (!searchData.filter) searchData.filter = {}
      searchData.filter.enabled = action.enabled
    } 

  }
  if (action.type == 'set_scan_condition') state.scan.json.pass.condition = action.value
  if (action.type == 'scan_success_text') state.scan.json.pass.success = action.value
  if (action.type == 'scan_failure_text') {
    if (state.scan.json.pass.failure && typeof state.scan.json.pass.failure == 'object') state.scan.json.pass.failure.text = action.value
    else state.scan.json.pass.failure = action.value
  }
  if (action.type == 'enable_scan_failure_followup') {
    if (action.enabled) {
      const text = state.scan.json.pass.failure
      state.scan.json.pass.failure = { text, action: { path: ''} }
    }
    else {
      state.scan.json.pass.failure = state.scan.json.pass.failure.text || ''
    }
  }
  if (action.type == 'scan_failure_action_path') state.scan.json.pass.failure.action.path = action.path
  if (action.type == 'scan_failure_action_function') state.scan.json.pass.failure.action.function = action.value
  if (action.type == 'scan_failure_add_action_data') {
    if (!state.scan.json.pass.failure.action.data) state.scan.json.pass.failure.action.data = {}
    state.scan.json.pass.failure.action.data[`key${Object.keys(state.scan.json.pass.failure.action.data).length}`] = ''
  }
  if (action.type == 'scan_failure_action_data_key') {
    state.scan.json.pass.failure.action.data[action.newKey] = state.scan.json.pass.failure.action.data[action.key]
    delete state.scan.json.pass.failure.action.data[action.key]
  }
  if (action.type == 'scan_failure_remove_action_data') {
    delete state.scan.json.pass.failure.action.data[action.key]
  }
  if (action.isScanFailure) {
    let obj = state.scan.json.pass.failure.action.data
    let key = action.key
    for (const i of action.indices){
      obj = obj[key]
      key = i
    }
    if (action.type == 'scan_failure_action_data_type') {
      if (action.dataType == 'number') obj[key] = parseFloat(obj[key]) || 0
      if (action.dataType == 'string') obj[key] = `${obj[key]}`
      if (action.dataType == 'array') obj[key] = [obj[key]]
      if (action.dataType == 'boolean') obj[key] = true
    }
    if (action.type == 'scan_failure_action_data_value') {
      if (typeof obj[key] == 'number') action.value = parseFloat(action.value)
      obj[key] = action.value
    }
    if (action.type == 'scan_failure_add_action_data_array_item') obj[key].push('')
    if (action.type == 'scan_failure_remove_action_data_array_item') obj[key].splice(action.index, 1)
  }
  if (action.type == 'enabled_scan_quest') {
    if (action.enabled) state.scan.json.quest = ScanQuest()
    else delete state.scan.json.quest
  }
  if (action.type == 'scan_quest_explanation') state.scan.json.quest.explanation = action.value
  if (action.type == 'scan_quest_parameter_value') {
    if (!state.scan.json.quest.parameters) state.scan.json.quest.parameters = {}
    state.scan.json.quest.parameters[action.key] = state.scan.json.parameters.find(parameter => parameter.name == action.key).type == 'number' ? parseFloat(action.value) : action.value
  }
  if (action.type == 'scan_quest_selection_time') {
    state.scan.json.quest.selection.age[action.unit] = action.value
  }
  if (action.type == 'scan_wizard_action_index') state.scan.wizard.actionIndex = action.index
  if (action.type == 'scan_wizard_search_index') state.scan.wizard.searchIndex = action.index
  return state
}