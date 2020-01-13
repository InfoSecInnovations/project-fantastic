const RunPowerShell = require('./runpowershell')

const states = {
  2: 'listen',
  3: 'syn_sent',
  5: 'established',
  8: 'close_wait',
  11: 'time_wait',
  100: 'bound'
}

const getNetTcpConnection = () => {
  processes = {}
  return RunPowerShell('get-nettcpconnection | ConvertTo-Json')
  .then(res => Promise.all(JSON.parse(res).map(async v => ({
    ip: v.LocalAddress,
    local_port: v.LocalPort,
    remote_address: v.RemoteAddress,
    remote_port: v.RemotePort,
    process: v.OwningProcess,
    state: states[v.State]
  }))))
}

module.exports = getNetTcpConnection