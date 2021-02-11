const GetPackageScripts = require('../util/getpackagescripts')

const getScanData = async config => {
  return await Promise.all(
    config.assets.packages.map(v => 
      GetPackageScripts(v, 'scans')
      .then(res => res.map(k => `${v}/${k}`))
    )
  )
  .then(res => res.flat())
}

module.exports = getScanData