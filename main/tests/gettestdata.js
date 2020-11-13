const GetPackageScripts = require('../util/getpackagescripts')

const getTestData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => 
      GetPackageScripts(v, 'tests')
      .then(res => res.map(k => `${v}/${k}`))
    )
  )
  .then(res => res.flat())
}

module.exports = getTestData