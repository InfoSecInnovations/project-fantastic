const GetCommand = require('../util/getpackagedasset')
const ValidateRole = require('./auth/validaterole')
const Abort = require('./abort')

const getCommands = (res, req, commands) => {
  console.log('-----------')
  console.log('received http request to get command settings...')
  res.onAborted(() => Abort(res))
  ValidateRole(req.getHeader('cookie'), 'user')
  .then(valid => {
    if (!valid) return !res.aborted && res.end()
    const command_data = Object.entries(commands)
    .map(v => {
      const source = GetCommand(v[0])
      // TODO: filter out invalid scripts and warn the user
      return {...source, key: v[0], enabled: v[1]}
    })
    .reduce((result, v) => ({ 
      ...result, 
      [v.key]: {name: v.name, description: v.description, hosts: v.hosts, enabled: v.enabled, role: v.role}
    }), {})
    console.log(`sent metadata for ${Object.keys(command_data).length} commands.`)
    console.log('-----------')
    res.end(JSON.stringify(command_data))
  })

}

module.exports = getCommands