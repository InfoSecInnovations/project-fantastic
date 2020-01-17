const {get, update, insert} = require('./operations')
const GetProcess = require('../commands/getprocess')

const addConnections = async connections => {
  const date = Date.now()
  const processes = {} // track process names we already found to avoid calling the PowerShell script unnecessarily

  const get_row = async ip => { // this function finds or creates and returns a row with a given IP
    let row = await get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip}}}) // first we have to find if a row already exists with the IP
    if (row) update({table: 'ips', row: {date}, conditions: {columns: {ip_id: row.ip_id}}}) // if it exists we should update the date
    else {
      row = await insert('nodes', {date}) // if not we have to insert a new node and then an IP belonging to this node
      .then(res => insert('ips', {ip, date, node_id: res}))
      .then(res => get({table: 'ips', columns: ['ip_id'], conditions:{columns: {ip_id: res}}}))
    }
    return row
  }

  for (const c of connections) {
    const name = processes[c.process] || await GetProcess(c.process)
    processes[c.process] = name
    // TODO: host which owns the process
    let process_id
    const process = await get({table: 'processes', columns: ['process_id'], conditions: {columns: {pid: c.process}}}) // find the process in the relevant table
    if (process) {
      update({table: 'processes', row: {name}, conditions: {columns: {process_id: process.process_id}}}) // if we found it, we should update the name in case the ID now corresponds to a different process
      process_id = process.process_id
    } 
    else {
      process_id = await insert('processes', {pid: c.process, name}) // if we didn't find a process, insert it
    }
    const local = await get_row(c.local_address) // get the ip row for the local address
    const remote = await get_row(c.remote_address) // get the ip row for the remote address
    await get({table: 'connections', columns: ['connection_id'], conditions: {columns: { // check if we already have a connection identical to this one
      from_id: local.ip_id, 
      to_id: remote.ip_id, 
      local_port: c.local_port, 
      remote_port: c.remote_port
    }}})
    .then(res => res ?
      update({table: 'connections', row: {state: c.state, process_id, date}, conditions: {columns: {connection_id: res.connection_id}}}) : // if we do, update with fresh information
      insert('connections', { // if not, insert
        from_id: local.ip_id, 
        to_id: remote.ip_id, 
        process_id, 
        local_port: c.local_port, 
        remote_port: c.remote_port, 
        state: c.state, 
        date
      }) 
    )
  }
}

module.exports = addConnections