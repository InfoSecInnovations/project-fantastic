const PwshFunction = require('../../../util/pwshfunction')
const JSONOutput = require('./json')
const XML = require('./xml')

/**
 * 
 * @param {import('../../types').Command} command 
 * @param {string} hostname 
 */
const runCommand = async (command, hostname) => {
  const output = await PwshFunction(command.run)(command.run.command, hostname).catch(rej => undefined) // TODO: do we want to warn if something failed?
  if (!output) return
  if (command.run.json) return JSONOutput(command.run.result, output)
  if (command.run.read_xml) return await XML(command)
  else return output
}

module.exports = runCommand