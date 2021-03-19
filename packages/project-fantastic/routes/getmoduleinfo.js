const GetModuleInfo = require('../util/getmoduleinfo')

const getModuleInfo = (user, res, req, query, config) => Promise.all(
    config.assets.packages.map(p => GetModuleInfo(p).then(info => ({key: p, value: info})))
  )
  .then(arr => {
    const info = arr.reduce((result, v) => ({...result, [v.key]: v.value}), {})
    if (res.aborted) return
    res.end(JSON.stringify(info))
  })

module.exports = getModuleInfo