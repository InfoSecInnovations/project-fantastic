/**
 * 
 * @param {import('@infosecinnovations/fantastic-db/types').DB} db 
 * @param {*} user 
 * @param {*} base_item 
 */
const getHistoryItem = (db, user, base_item) => {
  const columns = ['history_id', 'event_type', 'event_id', 'date']
  if (base_item.story_id) return db.get({
      table: 'all_history', 
      columns, 
      conditions: {columns: {user_id: user.user_id, event_type: 'story', event_id: base_item.story_id}}
    })
    .then(item => ({...base_item, ...item}))
  if (base_item.quest_id) return db.get({
      table: 'all_history', 
      columns, 
      conditions: {columns: {user_id: user.user_id, event_type: 'quest', event_id: base_item.quest_id}}
    }) 
    .then(item => ({...base_item, ...item}))
  if (base_item.scan_id) return db.get({
      table: 'all_history', 
      columns, 
      conditions: {columns: {user_id: user.user_id, event_type: 'scan', event_id: base_item.scan_id}}
    }) 
    .then(item => ({...base_item, ...item}))
  if (base_item.action_id) return db.get({
      table: 'all_history', 
      columns, 
      conditions: {columns: {user_id: user.user_id, event_type: 'action', event_id: base_item.action_id}}
    }) 
    .then(item => ({...base_item, ...item}))
}

module.exports = getHistoryItem