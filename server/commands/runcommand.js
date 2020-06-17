const PwshFunction = require('../util/pwshfunction')

const get_result = (input, output) => {
  if (typeof input === 'string') return output[input]
  if (input.map) return input.map[output[input.key]] || 'unknown'
}

const runCommand = async (command, hostname) => {
  const output = await PwshFunction(command.run)(command.run.command, hostname, undefined, false) // TODO: do we always want logging set to false?
  if (!output) return
  if (command.run.json) return output.map(v => {
    if (typeof command.run.result === 'string') return get_result(command.run.result, v)
    return Object.entries(command.run.result).reduce((result, r) => ({...result, [r[0]]: get_result(r[1], v)}), {})
  })
  else return output
}

module.exports = runCommand