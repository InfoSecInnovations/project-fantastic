const GetAsset = require('../util/getpackagedasset')

const getTests = (res, req, tests) => {
  console.log('-----------')
  console.log('received http request to get available tests...')
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
}

module.exports = getTests