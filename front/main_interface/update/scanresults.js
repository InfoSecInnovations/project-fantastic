export default (state, action) => {
  if (!action.results) return
  state.scan_results.data[action.scan] = action.results
  state.scan_results.status[action.scan] = 'loaded'
  state.scan_results.date[action.scan] = action.date
  state.scan_results.parameters[action.scan] = action.parameters
  state.scan_results.scan_ids[action.scan] = action.scan_id
  state.scan_results.history_items[action.scan] = action.history_item
}