const GetPackage = require('../util/getpackage')

const getActionData = async config => {
  if (!config.actions) return []
  return await Promise.all(
    config.actions.map(v => GetPackage(v).then(res => Object.keys(res).map(k => `${v}/${k}`)))
  ).then(res => res.flat())
}

module.exports = getActionData