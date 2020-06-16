const PwshFunction = require('../util/pwshfunction')

const runCommand = async (command, hostname) => {
  const output = await PwshFunction(command.run)(command.run.command, hostname, undefined, false) // TODO: do we always want logging set to false?
  if (!output) return
  if (command.run.json) return output.map(v => {
    if (typeof command.run.result === 'string') return v[command.run.result]
  })
  else return output
}

module.exports = runCommand