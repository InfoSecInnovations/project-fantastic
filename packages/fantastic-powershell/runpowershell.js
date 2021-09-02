const { spawn } = require('child_process')
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')

/**
 * Run a PowerShell command in a child process.
 * @param {string} command 
 * @param {Object} params 
 * @param {boolean} log Enable error logging.
 * @returns {Promise<string>} The result of running the command.
 */
const child = (command, params) => new Promise((resolve, reject) => {
  if (params) command = FormatString(command, params)
  const child_process = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', command], {env: process.env})
  let buffer
  child_process.stdout.on('data', d => {
    buffer = buffer ? Buffer.concat([buffer, d]) : Buffer.concat([d])
  })
  child_process.stderr.on('data', d => {
    reject(d.toString())
  })
  child_process.on('exit', code => {
    if (code !== 0) return reject(`Exited with code ${code}`)
    const s = buffer ? buffer.toString() : ''
    resolve(s)
  })
})

module.exports = child