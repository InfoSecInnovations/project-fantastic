export default (state, action) => {
  if (!action.results) return
  state.quest_results.data[action.quest] = action.results
  state.quest_results.status[action.quest] = 'loaded'
  state.quest_results.date[action.quest] = action.date
  state.quest_results.scan_ids[action.quest] = action.scan_id
  state.quest_results.history_items[action.quest] = action.history_item
}