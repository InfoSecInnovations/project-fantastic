const Shell = require('node-powershell')

const run = async command => {
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  })
  ps.addCommand(command)
  const result = await ps.invoke().catch(rej => {
    console.log(`PowerShell command failed: ${rej}`)
    return ''
  })
  ps.dispose()
  return result
}

const states = {
  2: 'listen',
  3: 'syn_sent',
  5: 'established',
  8: 'close_wait',
  11: 'time_wait',
  100: 'bound'
}

const new_node = ip => ({ip, connections: []})

let processes = {}
const get_process = id => processes[id] || (processes[id] = run(`(get-process -id ${id}).name`))

const getNetTcpConnection = () => {
  processes = {}
  return run('get-nettcpconnection | ConvertTo-Json')
  .then(res => Promise.all(JSON.parse(res).map(async v => ({
    ip: v.LocalAddress,
    local_port: v.LocalPort,
    remote_address: v.RemoteAddress,
    remote_port: v.RemotePort,
    process: {id: v.OwningProcess, name: await get_process(v.OwningProcess).catch(rej => '')}, //sometimes the process doesn't exist anymore by the time this executes so we have to catch it
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