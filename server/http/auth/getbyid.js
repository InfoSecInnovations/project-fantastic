const GetConfig = require('../../util/getconfig')
const GetPackage = require('../../util/getpackage')

const getById = async id => {
  const config = await GetConfig()
  const auth_module = await GetPackage(config.authentication)
  return await auth_module.get(id)
}

module.exports = getById