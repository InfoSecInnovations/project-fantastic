const GetCookie = require('@infosecinnovations/fantastic-utils/getcookie')
const Abort = require('../abort')

const redirect = res => {
  res.writeStatus('302 Found')
  res.writeHeader('Location', '/auth')
  res.end()
}

const cookie_name = 'session_id'
const logOut = async (res, req, auth_module) => {
  Abort(res)
  const header = req.getHeader('cookie')
  const session_id = GetCookie(header, cookie_name)
  await auth_module.invalidate(session_id)
  return !res.aborted && redirect(res)
}
module.exports = logOut