const RunPowerShell = require('./runpowershell')

const cimSession = (command, hostname) => 
{
  const index = !hostname ? -1 : command.indexOf('|')
  const session = hostname ? `-CimSession ${hostname} ` : ''
  return RunPowerShell((index <= 0) ? `${command} ${session}` : `${command.substring(0, index - 1)} ${session} ${command.substring(index - 1)}`)
}

module.exports = cimSession