const GetCookie = require('@infosecinnovations/fantastic-utils/getcookie')

const cookie_name = 'session_id'

/**
 * Get the user data from the cookie HTTP header
 * @param {{}} auth_module
 * @param {string} header
 * @returns {Promise<import('@infosecinnovations/fantastic-utils/types').User>}
 */
const auth = async (auth_module, header) => {
  const session_id = GetCookie(header, cookie_name)
  if (!session_id) return
  return await auth_module.verify(session_id)
}
module.exports = auth