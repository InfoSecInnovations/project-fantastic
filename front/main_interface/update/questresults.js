const questResults = (state, action) => {
  if (!action.results) return
  state.quest_results.data[action.quest] = action.results
  state.quest_results.status[action.quest] = 'loaded'
  state.quest_results.date[action.quest] = action.date
}

module.exports = questResults