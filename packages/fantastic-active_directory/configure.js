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
  init()
  const config = await FS.readJSON(Path.join(process.cwd(), 'config.json'))
  if (!config.authentication.config) config.authentication.config = {}
  const authConfig = config.authentication.config
  if (!authConfig.credentials) authConfig.credentials = {}
  if (!authConfig.credentials.url) authConfig.credentials.url = await GetInput('Enter Active Directory controller URL: ')
  if (!authConfig.credentials.baseDN) authConfig.credentials.baseDN = await GetInput('Enter Active Directory base DN: ')

  if (!authConfig.groups) authConfig.groups = {}
  if (!authConfig.groups.admin) authConfig.groups.admin = await GetInput(`Enter Fantastic admin group name (${defaultGroups.admin}): `) || defaultGroups.admin
  if (!authConfig.groups.elevated) authConfig.groups.elevated = await GetInput(`Enter Fantastic elevated access group name (${defaultGroups.elevated}): `) || defaultGroups.elevated
  if (!authConfig.groups.user) authConfig.groups.user = await GetInput(`Enter Fantastic user group name (${defaultGroups.user}): `) || defaultGroups.user
  await FS.writeJSON(Path.join(process.cwd(), 'config.json'), config)
}

module.exports = configure