const Common = require('../../common/update')

export default (state, action) => {
  state = Common(state, action)
  if (action.type == 'logs') state.logs = action.logs
  if (action.type == 'page') state.page = action.page
  if (action.type == 'last_page') state.last_page = action.last_page
  return state
}