import Common from '@infosecinnovations/fantastic-front/update'

export default (state, action) => {
  state = Common(state, action)
  if (action.type == 'logs') state.logs = action.logs
  if (action.type == 'page') state.page = action.page
  if (action.type == 'last_page') state.last_page = action.last_page
  if (action.type == 'enable_event_type') state.search.event_types[action.event_type] = action.enabled
  if (action.type == 'username_search') state.search.username = action.username
  return state
}