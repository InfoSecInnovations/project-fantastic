const getCommands = (res, req, commands) => {
  console.log('-----------')
  console.log('received http request to get command settings...')
  const command_data = Object.entries(commands)
    .map(v => {
      const source = require(`../config/data_sources/${v[0]}`)
      // TODO: filter out invalid scripts and warn the user
      return {...source, filename: v[0], enabled: v[1]}
    })
    .reduce((result, v) => ({ 
      ...result, 
      [v.filename]: {name: v.name || v.filename.slice(0, v.filename.lastIndexOf('.js')), description: v.description, enabled: v.enabled}
    }), {})
  console.log(`sent metadata for ${Object.keys(command_data).length} commands.`)
  console.log('-----------')
  res.end(JSON.stringify(command_data))
}

module.exports = getCommands