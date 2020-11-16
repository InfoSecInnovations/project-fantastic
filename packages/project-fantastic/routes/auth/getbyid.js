const GetConfig = require('../../util/getconfig')
const GetPackage = require('../../util/getpackage')

const getById = async id => {
  const config = await GetConfig()
  const auth_module = GetPackage(config.authentication)
  return await auth_module.getByID(id)
}

module.exports = getById