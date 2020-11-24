const GetInput = require('@infosecinnovations/fantastic-utils/getinput')
const {init} = require('./db')
const FS = require('fs-extra')
const Path = require('path')

const defaultGroups = {
  "user": "fantastic-user",
  "elevated": "fantastic-elevated",
  "admin": "fantastic-admin"
}

const configure = async () => {
  await init()
  const config = await FS.readJSON(Path.join(process.cwd(), 'config.json'))
  if (!config.authentication.config) config.authentication.config = {}
  const authConfig = config.authentication.config
  if (!authConfig.credentials) authConfig.credentials = {}
  if (!authConfig.credentials.url) authConfig.credentials.url = await GetInput('Enter Active Directory controller URL (ldap://dc.domain.com): ')
  if (!authConfig.credentials.baseDN) authConfig.credentials.baseDN = await GetInput('Enter Active Directory base DN (dc=domain,dc=com): ')

  if (!authConfig.groups) authConfig.groups = {}
  if (!authConfig.groups.admin) authConfig.groups.admin = await GetInput(`Enter Fantastic admin group name (default: ${defaultGroups.admin}): `) || defaultGroups.admin
  if (!authConfig.groups.elevated) authConfig.groups.elevated = await GetInput(`Enter Fantastic elevated access group name (default: ${defaultGroups.elevated}): `) || defaultGroups.elevated
  if (!authConfig.groups.user) authConfig.groups.user = await GetInput(`Enter Fantastic user group name (default: ${defaultGroups.user}): `) || defaultGroups.user
  await FS.writeJSON(Path.join(process.cwd(), 'config.json'), config, {spaces: '\t'})
}

module.exports = configure