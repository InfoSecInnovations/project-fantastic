const SQLite3 = require('sqlite3').verbose()
const RunPowerShell = require('./runpowershell')

const run = queries => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.serialize(() => {
    queries.forEach(v => db.run(v, err => err && console.log(err.message)))
  })
  db.close(err => err && reject(err) || resolve())
})

const get = query => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.get(query, (err, row) => {
    if (err) reject(err)
    else resolve(row)
  })
  db.close(err => err && console.error(err.message))
})

const all = query => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.all(query, (err, row) => {
    if (err) reject(err)
    else resolve(row)
  })
  db.close(err => err && console.error(err.message))
})

const init = () => {
  run([
    `CREATE TABLE IF NOT EXISTS nodes(
      node_id INTEGER PRIMARY KEY,
      ipv4 TEXT UNIQUE,
      ipv6 TEXT UNIQUE,
      mac TEXT UNIQUE,
      hostname TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS processes(
      process_id INTEGER PRIMARY KEY,
      pid INTEGER,
      name TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS connections(
      connection_id INTEGER PRIMARY KEY,
      from_id INTEGER,
      to_id INTEGER,
      process_id INTEGER,
      local_address TEXT,
      local_port INTEGER,
      remote_address TEXT,
      remote_port INTEGER,
      state TEXT,
      FOREIGN KEY (from_id)
        REFERENCES nodes (node_id)
        ON DELETE CASCADE,
      FOREIGN KEY (to_id)
        REFERENCES nodes (node_id)
        ON DELETE CASCADE,
      FOREIGN KEY (process_id)
        REFERENCES processes (process_id)
        ON DELETE CASCADE
    )`
  ])
  .catch(rej => console.log(rej.message))
}

const addNodes = async nodes => { // this seems a bit messy but it does the job (hopefully)
  for (const n of nodes) {
    await get(
      `SELECT node_id 
      FROM nodes
      WHERE ipv4 = '${n.ipv4}' OR ipv6 = '${n.ipv6}' OR mac = '${n.mac}'`
    )
    .then(res => { // TODO: merge nodes if we have separate ones for ipv4 and ipv6 that we realise are the same
      const columns = ['ipv4', 'ipv6', 'mac', 'hostname']
      if (res) 
        run([
          `UPDATE nodes
          SET ${columns.map(c => n[c] && `${c} = '${n[c]}'`).filter(c => c).join()}
          WHERE node_id=${res.node_id}`
        ])
        .catch(rej => console.log(rej.message))
      else 
        run([
          `INSERT INTO nodes (ipv4, ipv6, mac, hostname)
          VALUES(${columns.map(c => n[c] ? `'${n[c]}'` : 'NULL').join()})`
        ])
        .catch(rej => console.log(rej.message))
    })
  }
}

const get_process = id => RunPowerShell(`(get-process -id ${id}).name`)

const addConnections = async connections => {
  const get_protocol = ip => ip.includes(':') ? 'ipv6' : 'ipv4'
  const get_row = async ip => {
    const protocol = get_protocol(ip)
    let row = await get(
      `SELECT node_id
      FROM nodes
      WHERE ${protocol} = '${ip}'`
    )
    if (!row) {
      await run([
        `INSERT INTO nodes (${protocol})
        VALUES('${ip}')`
      ])
      row = await get(
        `SELECT node_id
        FROM nodes
        WHERE ${protocol} = '${ip}'`
      )
    }
    return row
  }
  for (const c of connections) {
    const name = await get_process(c.process)
    // TODO: machine which owns the process
    let process = await get(
      `SELECT process_id
      FROM processes
      WHERE pid = ${c.process}`
    )
    if (process) {
      run([
        `UPDATE processes
        SET name = '${name}'
        WHERE process_id = ${process.process_id}`
      ])
    }
    else {
      await run([
        `INSERT INTO processes (pid, name)
        VALUES(${c.process}, '${name}')`
      ])
      process = await get(
        `SELECT process_id
        FROM processes
        WHERE pid = ${c.process}`
      )
    }
    const local = await get_row(c.ip)
    const remote = await get_row(c.remote_address)
    await get(
      `SELECT connection_id
      FROM connections
      WHERE from_id = '${local.node_id}' AND to_id = '${remote.node_id}' AND local_address = '${c.ip}' AND local_port = ${c.local_port} AND remote_address = '${c.remote_address}' AND remote_port = ${c.remote_port}`
    )
    .then(res => res ?
      run([
        `UPDATE connections
        SET process_id = ${process.process_id}, state = '${c.state}'`
      ]) :
      run([
        `INSERT INTO connections (from_id, to_id, process_id, local_address, local_port, remote_address, remote_port, state)
        VALUES(${local.node_id}, ${remote.node_id}, ${process.process_id}, '${c.ip}', ${c.local_port}, '${c.remote_address}', ${c.remote_port}, '${c.state}')`
      ]))
  }
}

const getNodes = () => 
  all(`SELECT * FROM nodes`)
  .then(res => {
    return res.map(v => ({...v, connections: []})) // TODO: get connections from relevant DB
  })

module.exports = {init, addNodes, addConnections, getNodes}