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
  return state
}