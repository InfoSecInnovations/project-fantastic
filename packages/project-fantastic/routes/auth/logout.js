const GetCookie = require('@infosecinnovations/fantastic-utils/getcookie')
const GetConfig = require('../../util/getconfig')
const GetPackage = require('../../util/getpackage')

const redirect = res => {
  res.writeStatus('302 Found')
  res.writeHeader('Location', '/auth')
  res.end()
}

const cookie_name = 'session_id'
const logOut = async (res, req) => {
  res.onAborted(() => res.aborted = true)
  const header = req.getHeader('cookie')
  const config = await GetConfig()
  const session_id = GetCookie(header, cookie_name)
  const auth_module = GetPackage(config.authentication)
  await auth_module.invalidate(session_id)
  return redirect(res)
}
module.exports = logOut