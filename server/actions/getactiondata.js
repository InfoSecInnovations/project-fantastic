const GetPackageScripts = require('../util/getpackagescripts')

const getActionData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => GetPackageScripts(v, 'actions').then(res => res.map(k => `${v}/${k}`)))
  ).then(res => res.flat())
}

module.exports = getActionData