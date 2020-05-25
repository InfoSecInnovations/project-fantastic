const GetPackage = require('../util/getpackage')

const getQuestData = async config => {
  if (!config.tests) return []
  return await Promise.all(
    config.tests.map(v => 
      GetPackage(v)
      .then(res => Object.entries(res).filter(e => e[1].quest).map(e => `${v}/${e[0]}`))
    )
  )
  .then(res => res.flat())
}

module.exports = getQuestData