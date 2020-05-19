const GetConfig = require('../utils/getconfig')
const ActiveDirectory = require('../activedirectory')

const getRole = async username => {
  const ad = await ActiveDirectory()
  const config = await GetConfig()
  // check in this order in case the user is in more than one group
  const admin = await ad.isUserMemberOf(username, config.groups.admin)
  if (admin) return 'admin'
  const elevated = await ad.isUserMemberOf(username, config.groups.elevated)
  if (elevated) return 'elevated'
  const user = await ad.isUserMemberOf(username, config.groups.user)
  if (user) return 'user'
}

module.exports = getRole