const GetQuery = require('./getquery')

const postCommands = (res, req, commands) => {
  const query = GetQuery(req)
  Object.entries(query).forEach(v => { // we should do this instead of just returning the query in case the user sends a bad post request to the server
    if (commands.hasOwnProperty(v[0])) commands[v[0]] = v[1] === 'true' // all the query values are strings
  })
  res.end()
  return commands
}

module.exports = postCommands