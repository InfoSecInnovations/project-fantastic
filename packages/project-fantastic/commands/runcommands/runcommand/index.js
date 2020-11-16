const PwshFunction = require('../../../util/pwshfunction')
const JSONOutput = require('./json')
const XML = require('./xml')

/**
 * 
 * @param {import('../../types').Command} command 
 * @param {string} hostname 
 */
const runCommand = async (command, hostname) => {
  const output = await PwshFunction(command.run)(command.run.command, hostname, undefined, false) // TODO: do we always want logging set to false?
  if (!output) return
  if (command.run.json) return JSONOutput(command.run.result, output)
  if (command.run.read_xml) return await XML(command)
  else return output
}

module.exports = runCommand