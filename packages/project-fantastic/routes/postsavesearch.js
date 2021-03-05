const {transaction} = require('../db')

const postSaveSearch = async (user, res, req, query) => {
  const date = Date.now()
  const db = await transaction()
  const selection_row = {
    min_date: query.date,
    max_date: query.max_date,
    connection_local_ip: query.connection_local_ip,
    connection_remote_ip: query.connection_remote_ip,
    connection_process: query.connection_process,
    connection_type: query.connection_type,
    connection_state_listen: query.connection_state && query.connection_state.includes('listen'),
    connection_state_syn_sent: query.connection_state && query.connection_state.includes('syn_sent'),
    connection_state_syn_received: query.connection_state && query.connection_state.includes('syn_received'),
    connection_state_established: query.connection_state && query.connection_state.includes('established'),
    connection_state_fin_wait_1: query.connection_state && query.connection_state.includes('fin_wait_1'),
    connection_state_fin_wait_2: query.connection_state && query.connection_state.includes('fin_wait_2'),
    connection_state_close_wait: query.connection_state && query.connection_state.includes('close_wait'),
    connection_state_closing: query.connection_state && query.connection_state.includes('closing'),
    connection_state_last_ack: query.connection_state && query.connection_state.includes('last_ack'),
    connection_state_time_wait: query.connection_state && query.connection_state.includes('time_wait'),
    connection_state_bound: query.connection_state && query.connection_state.includes('bound'),
    access_local: query.access && query.access.includes('local'),
    access_remote: query.access && query.access.includes('remote'),
    access_none: query.access && query.access.includes('none'),
    show_external: query.show_external == 'true',
    nodes: query.nodes && JSON.stringify(query.nodes),
    label: query.label,
    date,
    user_id: user.user_id
  }
  const selection_id = await db.insert('selection_history', selection_row)
  const history_id = await db.insert('all_history', {event_type: 'selection', event_id: selection_id, date, user_id: user.user_id})
  const max_sort = await db.get({table: 'saved', columns: ['MAX(sorting) AS sorting'], conditions: {columns: {user_id: user.user_id}}}).then(row => (row && row.sorting) || 0)
  await db.insert('saved', {user_id: user.user_id, history_id: history_id, sorting: max_sort + 1})
  await db.close()
  if (res.aborted) return
  res.end(JSON.stringify({}))
}

module.exports = postSaveSearch