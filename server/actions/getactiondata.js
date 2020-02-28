const getActionData = async config => config.actions ? config.actions.map(v => {
  const package = require(`../config/node_modules/${v}`)
    return Object.keys(package).map(k => `${v}/${k}`)
  }).flat() : []

module.exports = getActionData