const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const Auth = require('./auth')
const GetCommand = require('../util/getpackagedfunction')
const HasRole = require('fantastic-utils/hasrole')
const {insert} = require('../db')

const postCommands = (res, req, commands) => {
  Abort(res)
  const query = ParseQuery(req.getQuery())
  console.log('postCommands: received http request to change command settings...')
  return Auth(req.getHeader('cookie'))
  .then(async user => {
    if (!user) return !res.aborted && res.end()
    await Promise.all(Object.entries(query)
      .filter(v => commands.hasOwnProperty(v[0]))
      .map(v => GetCommand(v[0]).then(c => ({...c, key: v[0], enabled: v[1]})))
    )
    .then(modules => modules
      .filter(v => HasRole(user, v.role))
      .forEach(v => {
        const enabled = v.enabled === 'true' // all the query values are strings
        const currently_enabled = commands[v.key] == 'enabled'
        if (currently_enabled != enabled) {
          const date = Date.now()
          insert('command_history', {command: v.key, status: enabled, date})
          .then(id => insert('all_history', {event_type: 'command', event_id: id, date, user_id: user.user_id}))
        }
        commands[v.key] = enabled ? 'enabled' : 'disabled'
        console.log(`postCommands: ${v.key} command ${commands[v.key] ? 'enabled' : 'disabled'}`)
      })
    )
    res.end()
    return commands
  })
}

module.exports = postCommands