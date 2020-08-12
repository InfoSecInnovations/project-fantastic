import Common from '../../common/update'
import FlexSearch from '../../common/update/flexsearch'

export default (state, action) => {
  if (action.type == 'node_data') state.node_data = action.data
  state = Common(state, action)
  state = FlexSearch(state, action)
  return state
}