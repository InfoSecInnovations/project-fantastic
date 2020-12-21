const GetPackagedData = require('../util/getpackageddata')
const GetPackageScripts = require('../util/getpackagescripts')

/**
 * Get all story quests available on the server
 * @param {{}} config
 * @returns {Promise<string[]>}
 */
const getStoryData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => 
      GetPackageScripts(v, 'stories')
      .then(res => Promise.all(res.map(s => GetPackagedData(s, 'stories').then(res => ({key: s, value: res})))))
      .then(res => res.map(s => `${v}/${s.key}`))
    )
  )
  .then(res => res.flat())
}

module.exports = getStoryData