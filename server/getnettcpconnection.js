const Shell = require('node-powershell')

const shell = () => new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
})

const states = {
  2: 'listen',
  3: 'syn_sent',
  5: 'established',
  8: 'close_wait',
  11: 'time_wait',
  100: 'bound'
}

const new_node = ip => ({ip, connections: []})

const get_process = id => {
  const ps = shell()
  ps.addCommand(`(get-process -id ${id}).name`)
  return ps.invoke()
}

const getNetTcpConnection = () => {
  const ps = shell()
  ps.addCommand('get-nettcpconnection | ConvertTo-Json')
  return ps.invoke()
  .then(res => Promise.all(JSON.parse(res).map(async v => ({
    ip: v.LocalAddress,
    local_port: v.LocalPort,
    remote_address: v.RemoteAddress,
    remote_port: v.RemotePort,
    process: {id: v.OwningProcess, process: await get_process(v.OwningProcess).catch(rej => '')},
    state: states[v.State]
  }))))
  .then(res => res.reduce((result, v) => {
    let node = result.find(n => n.ip == v.ip)
    if (!node) {
      node = new_node(v.ip)
      result.push(node)
    }
    const {ip, ...connection} = v
    node.connections.push(connection)
    if (!result.find(n => n.ip == v.remote_address)) result.push(new_node(v.remote_address))
    return result
  }, []))
}

module.exports = getNetTcpConnection