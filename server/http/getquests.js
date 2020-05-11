const GetAsset = require('../util/getpackagedasset')
const Auth = require('./auth')
const HasRole = require('fantastic-utils/hasrole')
const Abort = require('./abort')

const getQuests = (res, req, quests) => { // TODO: this should get daily quests, instead of all of them.
  console.log('-----------')
  console.log('received http request to get available quests...')
  res.onAborted(() => Abort(res))
  Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    const quest_data = await Promise.all(quests
      .map(v => GetAsset(v).then(a => ({...a, key: v})))
    )
    .then(quests => Promise.all(
      quests.map(v => GetAsset(v.test).then(test => ({quest: v, test})))
    ))
    .then(quests => quests.reduce((result, v) => {
      if (!HasRole(user, v.test.role)) return result
      return { 
        ...result, 
        [v.quest.key]: {
          name: v.quest.name, 
          description: `${v.test.description} ${v.quest.description}`, 
          hosts: v.test.hosts, 
          pass: v.test.pass, 
          parameters: v.quest.parameters
        }
      }
    }, {}))
    console.log(`sent metadata for ${Object.keys(quest_data).length} quests.`)
    console.log('-----------')
    res.end(JSON.stringify(quest_data))
  })

}

module.exports = getQuests