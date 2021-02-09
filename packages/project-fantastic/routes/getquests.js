const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const GetAbsolutePath = require('../util/getabsolutedatapath')

const getQuests = (user, res, req, query, scans) => { // TODO: this should get daily quests, instead of all of them.
  console.log('getQuests: received http request to get available quests...')
  Promise.all(scans.map(v => GetPackagedData(v, 'scans').then(a => ({...a, key: v}))))
  .then(scans => scans.filter(v => v.quest))
  .then(scans => {
    const quest_data = scans.reduce((result, v) => {
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
    if (res.aborted) return
    console.log(`getQuests: sent metadata for ${Object.keys(quest_data).length} quests.`)
    res.end(JSON.stringify(quest_data))
  })
}

module.exports = getQuests