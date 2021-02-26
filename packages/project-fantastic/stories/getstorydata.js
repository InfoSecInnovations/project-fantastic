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
      .then(res => res.map(s => `${v}/${s}`))
    )
  )
  .then(res => res.flat())
}

module.exports = getStoryData