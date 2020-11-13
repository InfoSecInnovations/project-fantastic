// this is intended to be run in a separate process when running the server in child process mode
const RunCommands = require('./commands/runcommands')

let command_data

process.on('message', m => {
  if (m.type == 'commands') command_data = m.commands
})

RunCommands(() => command_data)