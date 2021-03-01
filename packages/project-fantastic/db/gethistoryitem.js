const GetData = require('./getuserhistory/getdata')

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
    .then(row => GetData(db, row))
  if (base_item.quest_id) return db.get({
      table: 'all_history', 
      columns, 
      conditions: {columns: {user_id: user.user_id, event_type: 'quest', event_id: base_item.quest_id}}
    })
    .then(row => GetData(db, row))
  if (base_item.scan_id) {

    return db.get({
      table: 'all_history', 
      columns, 
      conditions: {columns: {user_id: user.user_id, event_type: 'scan', event_id: base_item.scan_id}}
    })
    .then(row => {
      // sometimes the parent scan can itself be a child of something else
      if (row) return GetData(db, row)
      return db.get({
        table: 'scan_history',
        conditions: {columns: {scan_id: base_item.scan_id}}
      })
      .then(row => getHistoryItem(db, user, row))
    })
  } 
  if (base_item.action_id) return db.get({
      table: 'all_history', 
      columns, 
      conditions: {columns: {user_id: user.user_id, event_type: 'action', event_id: base_item.action_id}}
    })
    .then(row => GetData(db, row))
}

module.exports = getHistoryItem