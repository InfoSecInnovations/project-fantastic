const RunPowerShell = require('fantastic-cli/runpowershell')
const FS = require('fs').promises

const states = [
  "Bound",
  "Closed",
  "CloseWait",
  "Closing",
  "DeleteTCB",
  "Established",
  "FinWait1",
  "FinWait2",
  "LastAck",
  "Listen",
  "SynReceived",
  "SynSent",
  "TimeWait"
]

// write the mapping for each state number from Get-NetTcpConnection to a file until we know all the states
const getStateMappings = async () => {
  for (const s of states) {
    await RunPowerShell(`get-nettcpconnection | where state -eq "${s}" | select -First 1 | ConvertTo-Json`)
    .then(async res => {
      if (res) {
        const json = JSON.parse(res)
        const obj = await FS.readFile('get-nettcpconnection_states.txt').then(res => JSON.parse(res), rej => ({}))
        obj[s] = json.State
        await FS.writeFile('get-nettcpconnection_states.txt', JSON.stringify(obj))
      }
    })
  }
}

module.exports = getStateMappings