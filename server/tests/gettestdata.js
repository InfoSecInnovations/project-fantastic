const GetConfigPath = require('../util/getconfigpath')
const Path = require('path')
const GetPackage = require('../util/getpackage')

const getTestData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => 
      GetPackage(v)
      .then(res => res.tests ? Object.keys(res.tests).map(k => `${v}/${k}`) : [])
    )
  )
  .then(res => res.flat())
}

module.exports = getTestData