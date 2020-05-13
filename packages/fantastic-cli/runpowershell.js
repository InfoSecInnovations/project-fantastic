const { spawn } = require('child_process')

const format_value = v => {
  if (typeof v === 'string') return `"${v}"`
  return v
}

const child = (command, params, log = true) => new Promise((resolve, reject) => {
  if (params) {
    command = `${Object.entries(params).map(v => `$${v[0]} = ${format_value(v[1])}
    `)} ${command}`
  }
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