const GetAsset = require('../util/getpackagedasset')
const ValidateRole = require('./auth/validaterole')
const Abort = require('./abort')

const getTests = (res, req, tests) => {
  res.onAborted(() => Abort(res))
  console.log('-----------')
  console.log('received http request to get available tests...')
  ValidateRole(req.getHeader('cookie'), 'user')  // TODO: filter tests by role
  .then(valid => {
    if (!valid) return !res.aborted && res.end()
    const test_data = tests
      .map(v => {
        // TODO: filter out invalid scripts and warn the user
        return {...GetAsset(v), key: v}
      })
      .reduce((result, v) => ({ 
          ...result, 
          [v.key]: {name: v.name, description: v.description, hosts: v.hosts, pass: v.pass, parameters: v.parameters}
        }), {})
    console.log(`sent metadata for ${Object.keys(test_data).length} tests.`)
    console.log('-----------')
    res.end(JSON.stringify(test_data))
  })
}

module.exports = getTests