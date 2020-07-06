const GetAsset = require('../util/getpackageddata')
const Auth = require('./auth')
const HasRole = require('fantastic-utils/hasrole')
const Abort = require('./abort')

const getQuests = (res, req, tests) => { // TODO: this should get daily quests, instead of all of them.
  console.log('getQuests: received http request to get available quests...')
  Abort(res)
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const quest_data = await Promise.all(tests.map(v => GetAsset(v).then(a => ({...a, key: v}))))
    .then(tests => tests.filter(v => v.quest))
    .then(tests => tests.reduce((result, v) => {
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
          actions: v.actions.map(v => v.path)
        }
      }
    }, {}))
    console.log(`getQuests: sent metadata for ${Object.keys(quest_data).length} quests.`)
    res.end(JSON.stringify(quest_data))
  })

}

module.exports = getQuests