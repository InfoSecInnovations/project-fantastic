const PwshFunction = require('../util/pwshfunction')

const runCommand = async (command, hostname) => {
  const output = await PwshFunction(command.run)(command.run.command, hostname, undefined, false) // TODO: do we always want logging set to false?
  if (!output) return
  if (command.run.json) return output.map(v => {
    if (typeof command.run.result === 'string') return v[command.run.result]
    return Object.entries(command.run.result).reduce((result, r) => ({...result, [r[0]]: v[r[1]]}), {})
  })
  else return output
}

module.exports = runCommand