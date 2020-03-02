const Shell = require('node-powershell')

const run = async (command, log = false) => {
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  })
  ps.addCommand(command)
  const result = await ps.invoke().catch(rej => {
    if (log) console.log(`PowerShell command failed: ${rej}`)
    return ''
  })
  ps.dispose()
  return result
}

module.exports = run