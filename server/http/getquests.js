const GetAsset = require('../util/getpackagedasset')
const Auth = require('./auth')
const HasRole = require('fantastic-utils/hasrole')
const Abort = require('./abort')

const getQuests = (res, req, quests) => { // TODO: this should get daily quests, instead of all of them.
  console.log('-----------')
  console.log('received http request to get available quests...')
  res.onAborted(() => Abort(res))
  Auth(req.getHeader('cookie'))
  .then(user => {
    if (!user) return !res.aborted && res.end()
    // TODO: filter by role and current quest status
    const quest_data = quests
    .map(v => {
      // TODO: filter out invalid scripts and warn the user
      return {...GetAsset(v), key: v}
    })
    .reduce((result, v) => {
      const test = GetAsset(v.test)
      if (!HasRole(user, test.role || 'user')) return result
      return { 
        ...result, 
        [v.key]: {name: v.name, description: `${test.description} ${v.description}`, hosts: test.hosts, pass: test.pass, parameters: v.parameters}
      }
    }, {})
    console.log(`sent metadata for ${Object.keys(quest_data).length} quests.`)
    console.log('-----------')
    res.end(JSON.stringify(quest_data))
  })

}

module.exports = getQuests