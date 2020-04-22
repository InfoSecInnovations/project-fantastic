const GetAsset = require('../util/getpackagedasset')

const getQuests = (res, req, quests) => { // TODO: this should get daily quests, instead of all of them.
  console.log('-----------')
  console.log('received http request to get available quests...')
  const quest_data = quests
    .map(v => {
      // TODO: filter out invalid scripts and warn the user
      return {...GetAsset(v), key: v}
    })
    .reduce((result, v) => {
      const test = GetAsset(v.test)
      return { 
        ...result, 
        [v.key]: {name: v.name, description: `${test.description} ${v.description}`, hosts: test.hosts, pass: test.pass, parameters: v.parameters}
      }
    }, {})
  console.log(`sent metadata for ${Object.keys(quest_data).length} quests.`)
  console.log('-----------')
  res.end(JSON.stringify(quest_data))
}

module.exports = getQuests