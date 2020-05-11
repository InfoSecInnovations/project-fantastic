const GetPackage = require('../util/getpackage')

const getQuestData = async config => {
  if (!config.quests) return []
  return await Promise.all(
    config.quests.map(v => 
      GetPackage(v)
      .then(res => Object.keys(res).map(k => `${v}/${k}`))
    )
  )
  .then(res => res.flat())
}

module.exports = getQuestData