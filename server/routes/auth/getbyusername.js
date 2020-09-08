const GetConfig = require('../../util/getconfig')
const GetPackage = require('../../util/getpackage')

const getByUsername = async username => {
  const config = await GetConfig()
  const auth_module = await GetPackage(config.authentication)
  return await auth_module.getByUsername(username)
}

module.exports = getByUsername