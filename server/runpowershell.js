const Shell = require('node-powershell')

const run = async command => {
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  })
  ps.addCommand(command)
  const result = await ps.invoke().catch(rej => {
    console.log(`PowerShell command failed: ${rej}`)
    return ''
  })
  ps.dispose()
  return result
}

module.exports = run