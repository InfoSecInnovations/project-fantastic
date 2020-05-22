const ParseQuery = require('fantastic-utils/parsequery')
const Abort = require('./abort')
const Auth = require('./auth')
const GetCommand = require('../util/getpackagedfunction')
const HasRole = require('fantastic-utils/hasrole')

const postCommands = (res, req, commands) => {
  res.onAborted(() => Abort(res))
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log('received http request to change command settings...')
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
        commands[v.key] = v.enabled === 'true' // all the query values are strings
        console.log(`${v.key} command ${commands[v.key] ? 'enabled' : 'disabled'}`)
      })
    )
    console.log('-----------')
    res.end()
    return commands
  })
}

module.exports = postCommands