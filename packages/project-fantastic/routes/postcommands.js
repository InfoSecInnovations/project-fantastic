const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const {transaction} = require('../db')

const postCommands = async (user, res, req, query, commands) => {
  console.log('postCommands: received http request to change command settings...')
  const modules = await Promise.all(Object.entries(query)
  .filter(v => commands.hasOwnProperty(v[0]))
  .map(v => GetPackagedData(v[0], 'commands').then(c => ({...c, key: v[0], enabled: v[1]}))))
  .then(modules => modules.filter(v => HasRole(user, v.role)))
  const db = await transaction()
  for (const module of modules) {
    const enabled = module.enabled === 'true' // all the query values are strings
    const currently_enabled = commands[module.key] == 'enabled'
    if (currently_enabled != enabled) {
      const date = Date.now()
      const event_id = await db.insert('command_history', {command: module.key, status: enabled, date})
      await db.insert('all_history', {event_type: 'command', event_id, date, user_id: user.user_id})
    }
    commands[module.key] = enabled ? 'enabled' : 'disabled'
    console.log(`postCommands: ${module.key} command ${commands[module.key] ? 'enabled' : 'disabled'}`)
  }
  await db.close()
  !res.aborted && res.end()
  return commands
}

module.exports = postCommands