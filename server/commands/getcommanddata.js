const GetPackage = require('../util/getpackage')

const getCommandData = async config => {
  if (!config.data_sources) return {}
  return await Promise.all(
    Object.entries(config.data_sources).map(v => 
      GetPackage(v[0])
      .then(res => Object.keys(res).map(k => ({[`${v[0]}/${k}`]: v[1].includes(k)})))
    )
  )
  .then(res => 
    res.flat()
    .reduce((result, v) => ({...result, ...v}), {})
  )
}

module.exports = getCommandData