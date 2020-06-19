const GetCommand = require('../util/getpackageddata')
const ValidateRole = require('./auth/validaterole')
const Abort = require('./abort')

const getCommands = (res, req, commands) => {
  console.log('-----------')
  console.log('received http request to get command settings...')
  Abort(res)
  ValidateRole(req.getHeader('cookie'), 'user')
  .then(async valid => {
    if (!valid) return !res.aborted && res.end()
    const command_data = await Promise.all(Object.entries(commands)
      .map(v => GetCommand(v[0]).then(c => ({...c, key: v[0], mode: v[1]})))
    ) // TODO: filter out invalid scripts and warn the user
    .then(commands => commands.reduce((result, v) => ({ 
      ...result, 
      [v.key]: {name: v.name, description: v.description, hosts: v.hosts, mode: v.mode, role: v.role}
    }), {}))
    console.log(`sent metadata for ${Object.keys(command_data).length} commands.`)
    console.log('-----------')
    res.end(JSON.stringify(command_data))
  })

}

module.exports = getCommands