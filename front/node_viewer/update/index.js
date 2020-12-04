import Common from '@infosecinnovations/fantastic-front/update'
import FlexSearch from '@infosecinnovations/fantastic-front/update/flexsearch'

export default (state, action) => {
  if (action.type == 'node_data') state.node_data = action.data
  state = Common(state, action)
  state = FlexSearch(state, action)
  return state
}