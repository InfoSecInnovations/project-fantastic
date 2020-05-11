const GetCookie = require('fantastic-utils/getcookie')
const GetConfig = require('../../util/getconfig')
const GetConfigPath = require('../../util/getconfigpath')
const Path = require('path')

const cookie_name = 'session_id'
const auth = async header => {
  const config = await GetConfig()
  const session_id = GetCookie(header, cookie_name)
  if (!session_id) return
  const path = await GetConfigPath()
  const auth_module = require(Path.join(path, 'node_modules', config.authentication))
  return await auth_module.verify(session_id)
}
module.exports = auth