import Common from '../../common/update'

export default (state, action) => {
  state = Common(state, action)
  if (action.type == 'logs') state.logs = action.logs
  if (action.type == 'page') state.page = action.page
  if (action.type == 'last_page') state.last_page = action.last_page
  if (action.type == 'enable_event_type') state.search.event_types[action.event_type] = action.enabled
  return state
}