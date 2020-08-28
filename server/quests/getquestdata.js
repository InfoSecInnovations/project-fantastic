const GetPackage = require('../util/getpackage')

const getQuestData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => 
      GetPackage(v)
      .then(res => res.tests ? Object.entries(res.tests).filter(e => e[1].quest).map(e => `${v}/${e[0]}`) : [])
    )
  )
  .then(res => res.flat())
}

module.exports = getQuestData