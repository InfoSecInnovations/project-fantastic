const GetPackage = require('./getpackage')

const getPackagedFunction = path => {
  const split = path.split('/')
  return GetPackage(split[0])
  .then(res => {
    const result = res[split[1]]
    if (!result.name) result.name = split[1]
    return result
  })
}

module.exports = getPackagedFunction