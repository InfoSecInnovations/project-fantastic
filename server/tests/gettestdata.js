const getTestData = async config => config.tests ? config.tests.map(v => {
  const package = require(`../config/node_modules/${v}`)
    return Object.keys(package).map(k => `${v}/${k}`)
  }).flat() : []

module.exports = getTestData