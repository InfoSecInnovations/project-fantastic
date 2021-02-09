const GetPackagedData = require('../util/getpackageddata')
const GetPackageScripts = require('../util/getpackagescripts')

/**
 * Get all quests available on the server
 * @param {{}} config
 * @returns {Promise<string[]>}
 */
const getQuestData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => 
      GetPackageScripts(v, 'scans')
      .then(res => Promise.all(res.map(t => GetPackagedData(t, 'scans').then(res => ({key: t, value: res})))))
      .then(res => res.filter(t => t.value.quest).map(t => `${v}/${t.key}`))
    )
  )
  .then(res => res.flat())
}

module.exports = getQuestData