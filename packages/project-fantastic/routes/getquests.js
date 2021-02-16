const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const GetAbsolutePath = require('../util/getabsolutedatapath')
const { transaction } = require('../db')

const getQuests = async (user, res, req, query, scans) => { // TODO: this should get daily quests, instead of all of them.
  console.log('getQuests: received http request to get available quests...')
  const db = await transaction()
  const now = new Date()
  const changeTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // change time is midnight
  const active = await db.all({table: 'daily_quests', columns: ['date_completed', 'quest', 'daily_quest_id'], conditions: {groups: [ // get quests we haven't completed, or that were completed today
    {columns: {user_id: user.user_id}},
    {groups: [
      {columns: {date_completed: changeTime.getTime()}, compare: '>='},
      {columns: {date_completed: null}}
    ], combine: 'OR'}
  ]}})
  const questData = await Promise.all(scans.map(v => GetPackagedData(v, 'scans').then(a => ({...a, key: v})))) // get data for all quests
  .then(scans => scans.filter(v => v.quest))
  .then(scans => scans.reduce((result, v) => {
      if (!HasRole(user, v.role)) return result
      return { 
        ...result, 
        [v.key]: {
          key: v.key,
          name: v.name, 
          description: `${v.description} ${v.quest.explanation}`, 
          hosts: v.hosts, 
          pass: v.pass, 
          parameters: v.quest.parameters,
          selection: v.quest.selection,
          actions: v.actions.map(a => GetAbsolutePath(a.path, v.key))
        }
      }
    }, {})
  )
  if (active.length < 3) {
    // remove stale complete quests
    await db.remove({table: 'daily_quests', conditions: {columns: {daily_quest_id: active.map(quest => quest.daily_quest_id)}, compare: 'NOT IN'}})
    while (active.length < 3) {
      const potentialQuests = Object.keys(questData).filter(quest => !active.find(current => current.quest == quest))
      if (potentialQuests.length == 0) break
      const newQuest = potentialQuests[Math.floor(Math.random() * potentialQuests.length)]
      await db.insert('daily_quests', {user_id: user.user_id, quest: newQuest})
      active.push({quest: newQuest})
    }
  }
  await db.close()
  if (res.aborted) return
  console.log(`getQuests: sent metadata for daily quests.`)
  res.end(JSON.stringify(
    active.reduce((result, quest) => ({
      ...result, 
      [quest.quest] : {
        ...questData[quest.quest], 
        date_completed: quest.date_completed}
    }), {})
  ))
}

module.exports = getQuests