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
  if (action.type == 'scan_search_item_mode') {
    const searchData = state.scan.json.actions[action.index].search[action.searchIndex]
    if (action.value == 'followup') {
      if (!searchData.followup) {
        searchData.followup = {}
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
  if (action.type == 'set_scan_search_item_label') {
    const searchData = state.scan.json.actions[action.index].search[action.searchIndex]
    searchData.label = action.value
  }
  if (action.type == 'enable_scan_search_item_filtering') {
    const searchData = state.scan.json.actions[action.index].search[action.searchIndex]
    if (action.enabled && !searchData.filter) searchData.filter = {}
    if (!action.enabled) delete searchData.filter
  }
  if (action.type == 'add_scan_search_item_filter_entry') {
    const searchData = state.scan.json.actions[action.index].search[action.searchIndex]
    searchData.filter[`key${Object.keys(searchData.filter).length}`] = ''
  }
  return state
}