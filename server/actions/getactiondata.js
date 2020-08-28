const GetPackage = require('../util/getpackage')

const getActionData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => GetPackage(v).then(res => res.actions ? Object.keys(res.actions).map(k => `${v}/${k}`) : []))
  ).then(res => res.flat())
}

module.exports = getActionData