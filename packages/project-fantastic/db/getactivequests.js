const getActiveQuests = (db, user) => {
  const now = new Date()
  const changeTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // change time is midnight
  return db.all({table: 'daily_quests', columns: ['date_completed', 'quest', 'daily_quest_id'], conditions: {groups: [ // get quests we haven't completed, or that were completed today
    {columns: {user_id: user.user_id}},
    {groups: [
      {columns: {date_completed: changeTime.getTime()}, compare: '>='},
      {columns: {date_completed: null}}
    ], combine: 'OR'}
  ]}})
} 

module.exports = getActiveQuests