export default (state, action) => {
  if (action.type == 'search_index') state.flex_search[action.search_type].index = action.index
  if (action.type == 'search_results') state.flex_search[action.search_type].results = action.results
  if (action.type == 'search_input') state.flex_search[action.search_type].query = action.query

  return state
}