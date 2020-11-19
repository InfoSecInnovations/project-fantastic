const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const GetAbsolutePath = require('../util/getabsolutedatapath')

const getQuests = (user, res, req, tests) => { // TODO: this should get daily quests, instead of all of them.
  console.log('getQuests: received http request to get available quests...')
  Promise.all(tests.map(v => GetPackagedData(v, 'tests').then(a => ({...a, key: v}))))
  .then(tests => tests.filter(v => v.quest))
  .then(tests => {
    const quest_data = tests.reduce((result, v) => {
      if (!HasRole(user, v.role)) return result
      return { 
        ...result, 
        [v.key]: {
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
    console.log(`getQuests: sent metadata for ${Object.keys(quest_data).length} quests.`)
    res.end(JSON.stringify(quest_data))
  })
}

module.exports = getQuests