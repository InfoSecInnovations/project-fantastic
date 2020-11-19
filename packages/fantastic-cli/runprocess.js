const {spawn} = require('child_process')

const runProcess = (cmd, args, error_message) => new Promise((resolve, reject) => {
  const spawned = spawn(cmd, args, { env: process.env, stdio: 'inherit', detached: true })
  spawned.on('close', code => {
    if (code !== 0) return reject(`${error_message || ''} with exit code ${code}`)
    resolve()
  })
})

module.exports = runProcess