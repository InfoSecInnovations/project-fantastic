const getQuestData = async config => config.quests ? config.quests.map(v => {
  const package = require(`../config/node_modules/${v}`)
    return Object.keys(package).map(k => `${v}/${k}`)
  }).flat() : []

module.exports = getQuestData