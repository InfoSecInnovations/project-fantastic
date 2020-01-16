const RunPowerShell = require('../runpowershell')
const {get, update, insert} = require('./operations')

const get_protocol = ip => ip.includes(':') ? 'ipv6' : 'ipv4'

const get_process = id => RunPowerShell(`(get-process -id ${id}).name`, false)

const addConnections = async connections => {
  const date = Date.now()
  const processes = {} // track process names we already found to avoid calling the PowerShell script unnecessarily

  const get_row = async ip => { // this function finds or creates and returns a node with a given IP
    const protocol = get_protocol(ip)
    let row = await get({table: 'nodes', columns: ['node_id'], conditions: {columns: {[protocol]: ip}}}) // first we have to find if a node already exists with the IP
    if (row) update({table: 'nodes', row: {date}, conditions: {columns: {node_id: row.node_id}}}) // if it exists we should update the date
    else {
      await insert('nodes', {[protocol]: ip, date}) // if we didn't find a node, insert it and get it
      row = await get({table: 'nodes', columns: ['node_id'], conditions:{columns: {[protocol]: ip}}})
    }
    return row
  }

  for (const c of connections) {
    const name = processes[c.process] || await get_process(c.process)
    processes[c.process] = name
    // TODO: host which owns the process
    let process = await get({table: 'processes', columns: ['process_id'], conditions: {columns: {pid: c.process}}}) // find the process in the relevant table
    if (process) update({table: 'processes', row: {name}, conditions: {columns: {process_id: process.process_id}}}) // if we found it, we should update the name in case the ID now corresponds to a different process
    else {
      await insert('processes', {pid: c.process, name}) // if we didn't find a process, insert it
      process = await get({table: 'processes', columns: ['process_id'], conditions: {columns: {pid: c.process}}}) // and get it so we know the ID
    }
    const local = await get_row(c.ip) // get the node for the local address
    const remote = await get_row(c.remote_address) // get the node for the remote address
    await get({table: 'connections', columns: ['connection_id'], conditions: {columns: { // check if we already have a connection identical to this one
      from_id: local.node_id, 
      to_id: remote.node_id, 
      local_address: c.ip, 
      local_port: c.local_port, 
      remote_address: c.remote_address, 
      remote_port: c.remote_port
    }}})
    .then(res => res ?
      update({table: 'connections', row: {state: c.state, date}, conditions: {columns: {process_id: process.process_id}}}) :
      insert('connections', { // if not, insert
        from_id: local.node_id, 
        to_id: remote.node_id, 
        process_id: process.process_id, 
        local_address: c.ip, 
        local_port: c.local_port, 
        remote_address: c.remote_address, 
        remote_port: c.remote_port, 
        state: c.state, 
        date
      }) 
    )
  }
}

module.exports = addConnections