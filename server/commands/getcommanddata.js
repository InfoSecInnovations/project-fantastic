const getCommandData = async config => config.data_sources ? Object.entries(config.data_sources).map(v => {
    const package = require(`../config/node_modules/${v[0]}`)
    return Object.keys(package).map(k => ({[`${v[0]}/${k}`]: v[1].includes(k)}))
  }).flat().reduce((result, v, i, arr) => ({...result, ...v}), {}) : {}

module.exports = getCommandData