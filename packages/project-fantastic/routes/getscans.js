const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const GetAbsolutePath = require('../util/getabsolutedatapath')

const getScans = (user, res, req, query, scans) => {
  console.log('getScans: received http request to get available scans...')
  Promise.all(scans
    .map(v => GetPackagedData(v, 'scans').then(t => ({...t, key:v})))
  )
  .then(scans => {
    const scan_data = scans      
    .filter(v => HasRole(user, v.role))
    .reduce((result, v) => {
      if (v.pass.failure && v.pass.failure.action) v.pass.failure.action.path = GetAbsolutePath(v.pass.failure.action.path, v.key)
      return { 
        ...result, 
        [v.key]: {
          key: v.key,
          name: v.name, 
          description: v.description, 
          hosts: v.hosts, 
          pass: v.pass, 
          parameters: v.parameters,
          actions: v.actions.map(a => GetAbsolutePath(a.path, v.key))
        }
      }
    }, {})
    if (res.aborted) return
    console.log(`getScans: sent metadata for ${Object.keys(scan_data).length} scans.`)
    res.end(JSON.stringify(scan_data))
  })
}

module.exports = getScans