import Search from '../defaults/search'

export default (state, action) => {
  state.search = Search()
  state.search.show_external = action.search.show_external ? true : false
  state.search.date = action.search.min_date
  state.search.connection_type = action.search.connection_type
  if (action.search.connection_state_listen) state.search.connection_state.push('listen')
  if (action.search.connection_state_syn_sent) state.search.connection_state.push('syn_sent')
  if (action.search.connection_state_syn_received) state.search.connection_state.push('syn_received')
  if (action.search.connection_state_established) state.search.connection_state.push('established')
  if (action.search.connection_state_fin_wait_1) state.search.connection_state.push('fin_wait_1')
  if (action.search.connection_state_fin_wait_2) state.search.connection_state.push('fin_wait_2')
  if (action.search.connection_state_close_wait) state.search.connection_state.push('close_wait')
  if (action.search.connection_state_closing) state.search.connection_state.push('closing')
  if (action.search.connection_state_last_ack) state.search.connection_state.push('last_ack')
  if (action.search.connection_state_time_wait) state.search.connection_state.push('time_wait')
  if (action.search.connection_state_bound) state.search.connection_state.push('bound')
  state.search.label = action.search.label
}