const {spawn} = require('child_process')

/**
 * Run a command
 * @param {string} cmd 
 * @param {string[]} args 
 * @param {string} [error_message] Error to prefix exit code
 */
const runProcess = (cmd, args, error_message) => new Promise((resolve, reject) => {
  const spawned = spawn(cmd, args, { env: process.env, stdio: 'inherit', detached: true })
  spawned.on('close', code => {
    if (code !== 0) return reject(`${error_message || 'Closed'} with exit code ${code}`)
    resolve()
  })
  spawned.on('error', error => reject(error))
})

module.exports = runProcess