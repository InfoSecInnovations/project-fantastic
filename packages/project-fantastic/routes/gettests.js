const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const GetAbsolutePath = require('../util/getabsolutedatapath')

const getTests = (user, res, req, query, tests) => {
  console.log('getTests: received http request to get available tests...')
  Promise.all(tests
    .map(v => GetPackagedData(v, 'tests').then(t => ({...t, key:v})))
  )
  .then(tests => {
    const test_data = tests      
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
    console.log(`getTests: sent metadata for ${Object.keys(test_data).length} tests.`)
    res.end(JSON.stringify(test_data))
  })
}

module.exports = getTests