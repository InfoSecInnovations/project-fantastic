const {transaction, update, OPEN_READONLY} = require('./operations')
const GetProcess = require('../commands/getprocess')

const addConnections = async (node_id, connections, is_remote) => {

  console.log(`adding ${connections.length} connections from node ${node_id} to database...`)

  const date = Date.now()
  const processes = {} // track process names we already found to avoid calling the PowerShell script unnecessarily
  let new_nodes = 0

  await update({table: 'nodes', row: {date}, conditions: {columns: {node_id}}}) // keep the node up to date

  // we do reading and writing in 2 different transactions to block the database as little as possible
  for (const c of connections) {
    const read = await transaction(OPEN_READONLY)
    const hostname = is_remote ? await read.get({table: 'nodes', columns: ['hostname'], conditions: {columns: {node_id}}}).then(res => res.hostname) : ''
    const name = processes[c.process] || await GetProcess(c.process, hostname)
    processes[c.process] = name
    let process_id
    const process = await read.get({table: 'processes', columns: ['process_id'], conditions: {columns: {pid: c.process, node_id}}}) // find the process in the relevant table
    const local_ip_row = await read.get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip: c.local_address, node_id}}})
    const remote_ip_row = await read.get({table: 'ips', columns: ['ip_id', 'node_id'], conditions: {columns: {ip: c.remote_address, node_id}}}) || // first we have to find if a row already exists with the IP on the same node (if so this is an internal connection)
    await read.get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip: c.remote_address}}, order_by: {date: 'DESC'}}) // if not check if the IP corresponds to another node, it's likely that in the case of more than one result the most recent is the correct one
    const existing = local_ip_row && remote_ip_row && await read.get({table: 'connections', columns: ['connection_id'], conditions: {columns: { // check if we already have a connection identical to this one
      from_id: local_ip_row.ip_id, 
      to_id: remote_ip_row.ip_id, 
      local_port: c.local_port, 
      remote_port: c.remote_port
    }}})
    read.close()
    const write = await transaction()
    if (process) {
      if (name) await write.update({table: 'processes', row: {name}, conditions: {columns: {process_id: process.process_id}}}) // if we found it, we should update the name in case the ID now corresponds to a different process
      process_id = process.process_id
    } 
    else {
      process_id = await write.insert('processes', {pid: c.process, name, node_id}) // if we didn't find a process, insert it
    }
    let local_ip_id
    if (local_ip_row) { // if we already have a row for the local IP, we need to update the date
      await write.update({table: 'ips', row: {date}, conditions: {columns: {ip_id: local_ip_row.ip_id}}})
      local_ip_id = local_ip_row.ip_id
    }
    else {
      local_ip_id = await write.insert('ips', {ip: c.local_address, date, first_date: date, node_id})
    }
    let remote_ip_id
    if (remote_ip_row) { // if we already have a row for the remote IP, we need to update the date
      await write.update({table: 'ips', row: {date}, conditions: {columns: {ip_id: remote_ip_row.ip_id}}})
      if (remote_ip_row.node_id !== node_id) await write.update({table: 'nodes', row: {date}, conditions: {columns: {node_id: remote_ip_row.node_id}}}) // also keep the node which owns the IP updated
      remote_ip_id = remote_ip_row.ip_id
    }
    else { // if not we have to insert a new node and then an IP belonging to this node
      remote_ip_id = await write.insert('nodes', {date, first_date: date})
      .then(res => write.insert('ips', {ip: c.remote_address, date, first_date: date, node_id: res}))
      new_nodes++
    }
    if (existing) await write.update({ // if we already found an identical connection, we just need to update it
      table: 'connections', 
      row: {state: c.state, process_id, date}, 
      conditions: {columns: {connection_id: existing.connection_id}}
    })
    else await write.insert('connections', { // if not, insert
      from_id: local_ip_id, 
      to_id: remote_ip_id, 
      process_id, 
      local_port: c.local_port, 
      remote_port: c.remote_port, 
      state: c.state, 
      date,
      first_date: date
    })
    await write.close()
  }

  console.log(`added ${connections.length} connections to database from node ${node_id} in ${Date.now() - date}ms. ${new_nodes} new nodes were found.`)
}

module.exports = addConnections