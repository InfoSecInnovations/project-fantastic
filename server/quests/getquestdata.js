const GetConfigPath = require('../util/getconfigpath')
const Path = require('path')

const getQuestData = async config => {
  if (!config.quests) return []
  const path = await GetConfigPath()
  return config.quests.map(v => {
    const package = require(Path.join(path, 'node_modules', v))
    return Object.keys(package).map(k => `${v}/${k}`)
  }).flat()
}

module.exports = getQuestData