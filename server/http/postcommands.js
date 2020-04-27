const ParseQuery = require('fantastic-utils/parsequery')

const postCommands = (res, req, commands) => {
  const query = ParseQuery(req.getQuery())
  console.log('-----------')
  console.log('received http request to change command settings...')
  Object.entries(query).forEach(v => { // we should do this instead of just returning the query in case the user sends a bad post request to the server
    if (commands.hasOwnProperty(v[0])){
      commands[v[0]] = v[1] === 'true' // all the query values are strings
      console.log(`${v[0]} command ${commands[v[0]] ? 'enabled' : 'disabled'}`)
    }
  })
  console.log('-----------')
  res.end()
  return commands
}

module.exports = postCommands