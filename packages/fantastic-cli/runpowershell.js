const { spawn } = require('child_process')

const child = (command, log = true) => new Promise((resolve, reject) => {
  const child_process = spawn('powershell.exe', [command])
  let buffer
  child_process.stdout.on('data', d => {
    buffer = buffer ? Buffer.concat([buffer, d]) : Buffer.concat([d])
  })
  child_process.stderr.on('data', d => {
    if (log) console.log(`PowerShell command failed: ${d}`)
    resolve('')
  })
  child_process.on('exit', () => {
    const s = buffer ? buffer.toString() : ''
    resolve(s)
  })
})

module.exports = child