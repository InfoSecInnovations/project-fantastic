const {transaction} = require('./operations')
const GetProcess = require('../commands/getprocess')

const addConnections = async (node_id, connections, is_remote) => {

  console.log(`adding ${connections.length} connections from node ${node_id} to database...`)

  const date = Date.now()
  const processes = {} // track process names we already found to avoid calling the PowerShell script unnecessarily
  let new_nodes = 0
  const db = await transaction()

  const get_remote_row = async ip => {

    let row = await db.get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip, node_id}}}) // first we have to find if a row already exists with the IP on the same node
    if (!row) row = await db.get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip}}, order_by: {date: 'DESC'}}) // if not check if the IP corresponds to another node, it's likely that in the case of more than one result the most recent is the correct one
    if (row) { // if it exists we should update the date of the IP and the corresponding node
      await db.update({table: 'ips', row: {date}, conditions: {columns: {ip_id: row.ip_id}}})
      .then(() => db.get({table: 'ips', columns: ['node_id'], conditions: {columns: {ip_id: row.ip_id}}}))
      .then(res => db.update({table: 'nodes', row: {date}, conditions: {columns: {node_id: res.node_id}}}))
    } 
    else {
      new_nodes++
      row = await db.insert('nodes', {date, first_date: date}) // if not we have to insert a new node and then an IP belonging to this node
      .then(res => db.insert('ips', {ip, date, first_date: date, node_id: res}))
      .then(res => db.get({table: 'ips', columns: ['ip_id'], conditions:{columns: {ip_id: res}}}))
    }
    return row
  }

  const get_local_row = async ip => {
    let row = await db.get({table: 'ips', columns: ['ip_id'], conditions: {columns: {ip, node_id}}}) // first we have to find if a row already exists with the IP on the same node
    if (row) { // if it exists we should update the date of the IP and the corresponding node
      await db.update({table: 'ips', row: {date}, conditions: {columns: {ip_id: row.ip_id}}})
      .then(() => db.update({table: 'nodes', row: {date}, conditions: {columns: {node_id}}}))
    } 
    else {
      row = await db.insert('ips', {ip, date, first_date: date, node_id}) // if we didn't find it we should insert it
      .then(res => db.get({table: 'ips', columns: ['ip_id'], conditions:{columns: {ip_id: res}}}))
    }
    return row
  }

  for (const c of connections) {
    const hostname = is_remote ? await db.get({table: 'nodes', columns: ['hostname'], conditions: {columns: {node_id}}}).then(res => res.hostname) : ''
    const name = processes[c.process] || await GetProcess(c.process, hostname)
    processes[c.process] = name
    let process_id
    const process = await db.get({table: 'processes', columns: ['process_id'], conditions: {columns: {pid: c.process, node_id}}}) // find the process in the relevant table
    if (process) {
      if (name) await db.update({table: 'processes', row: {name}, conditions: {columns: {process_id: process.process_id}}}) // if we found it, we should update the name in case the ID now corresponds to a different process
      process_id = process.process_id
    } 
    else {
      process_id = await db.insert('processes', {pid: c.process, name, node_id}) // if we didn't find a process, insert it
    }
    const local_ip = await get_local_row(c.local_address)
    const remote_ip = await get_remote_row(c.remote_address)
    await db.get({table: 'connections', columns: ['connection_id'], conditions: {columns: { // check if we already have a connection identical to this one
      from_id: local_ip.ip_id, 
      to_id: remote_ip.ip_id, 
      local_port: c.local_port, 
      remote_port: c.remote_port
    }}})
    .then(res => res ?
      db.update({table: 'connections', row: {state: c.state, process_id, date}, conditions: {columns: {connection_id: res.connection_id}}}) : // if we do, update with fresh information
      db.insert('connections', { // if not, insert
        from_id: local_ip.ip_id, 
        to_id: remote_ip.ip_id, 
        process_id, 
        local_port: c.local_port, 
        remote_port: c.remote_port, 
        state: c.state, 
        date,
        first_date: date
      }) 
    )
  }

  await db.close()

  console.log(`added ${connections.length} connections to database from node ${node_id} in ${Date.now() - date}ms. ${new_nodes} new nodes were found.`)
}

module.exports = addConnections