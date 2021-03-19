const GetPackagedData = require('../util/getpackageddata')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const End = require('./end')

const getCommands = (user, res, req, query, commands) => {
  console.log('getCommands: received http request to get command settings...')
  if (!HasRole(user, 'user')) return End(res)
  Promise.all(Object.entries(commands)
    .map(v => GetPackagedData(v[0], 'commands').then(c => ({...c, key: v[0], mode: v[1]})))
  ) // TODO: filter out invalid scripts and warn the user
  .then(commands => {
    const command_data = commands.reduce((result, v) => ({ 
      ...result, 
      [v.key]: {
        key: v.key, 
        name: v.name, 
        description: v.description, 
        hosts: v.hosts, 
        mode: v.mode, 
        role: v.role, 
        command: v.run.command,
        module: v.module
      }
    }), {})
    if (res.aborted) return
    console.log(`getCommands: sent metadata for ${Object.keys(command_data).length} commands.`)
    res.end(JSON.stringify(command_data))
  })
}

module.exports = getCommands