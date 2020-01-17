const RunPowerShell = require('./runpowershell')

const states = {
  2: 'listen',
  3: 'syn_sent',
  4: 'syn_received',
  5: 'established',
  7: 'fin_wait_2',
  8: 'close_wait',
  10: 'last_ack',
  11: 'time_wait',
  100: 'bound'
}

const getNetTcpConnection = () => RunPowerShell('get-nettcpconnection | ConvertTo-Json')
  .then(res => JSON.parse(res).map(v => {
    const state = states[v.State] || 'unknown'
    if (state === 'unknown') console.warn(`No mapping for Get-NetTcpConnection State ${v.State}`) 
    return {
      local_address: v.LocalAddress,
      local_port: v.LocalPort,
      remote_address: v.RemoteAddress,
      remote_port: v.RemotePort,
      process: v.OwningProcess,
      state
    }
  }))

module.exports = getNetTcpConnection