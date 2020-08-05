const Common = require('../../common/update')

export default (state, action) => {
  if (action.type == 'node_data') state.node_data = action.data
  state = Common(state, action)
  return state
}