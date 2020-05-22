const GetConfigPath = require('../util/getconfigpath')
const Path = require('path')
const GetPackage = require('../util/getpackage')

const getTestData = async config => {
  if (!config.tests) return []
  return await Promise.all(
    config.tests.map(v => 
      GetPackage(v)
      .then(res => Object.keys(res).map(k => `${v}/${k}`))
    )
  )
  .then(res => res.flat())
}

module.exports = getTestData