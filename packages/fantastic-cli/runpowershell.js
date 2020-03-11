//const Shell = require('node-powershell')
//const Edge = require('edge-js')
const { spawn } = require('child_process')

/*const nodePowershell = async (command, log = false) => {
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
}*/

/*
const edge = (command, log = false) => new Promise((resolve, reject) => {
  const run = Edge.func('ps', command)

  run(command, (e, res) => {
    if (e) {
      if (log) console.log(e.message)
      resolve('')
    }
    else {
      resolve(res[0])
    }
  })
})*/

const child = (command, log = false) => new Promise((resolve, reject) => {
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
    const s = buffer.toString()
    resolve(s)
  })
})

module.exports = child