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
    state.scan.json.actions.push({})
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
        if (!searchData.followup) {
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
        if (searchData.followup) {
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
    if (action.type == 'set_scan_search_item_followup_status') searchData.filter.enabled = action.value
  }

  return state
}