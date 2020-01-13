const SQLite3 = require('sqlite3').verbose()
const RunPowerShell = require('./runpowershell')

const run = queries => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.serialize(() => {
    queries.forEach(v => db.run(v, err => err && console.log(err.message)))
  })
  db.close(err => err && console.error(err.message))
}

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
}

const addNodes = async nodes => { // this seems a bit messy but it does the job (hopefully)
  for (const n of nodes) {
    await get(
      `SELECT node_id 
      FROM nodes
      WHERE ipv4 = '${n.ipv4}' OR ipv6 = '${n.ipv6}' OR mac = '${n.mac}'`)
    .then(res => {
      const columns = ['ipv4', 'ipv6', 'mac', 'hostname']
      if (res) run([
        `UPDATE nodes
        SET ${columns.map(c => n[c] && `${c} = '${n[c]}'`).filter(c => c).join()}
        WHERE node_id=${res.node_id}`
      ])
      else run([
        `INSERT INTO nodes (ipv4, ipv6, mac, hostname)
        VALUES(${columns.map(c => n[c] ? `'${n[c]}'` : 'NULL').join()})`
      ])
    })
  }
}

const get_process = id => RunPowerShell(`(get-process -id ${id}).name`)

const addConnections = connections => {
  for (const c of connections) {
    // TODO: create row for remote address if we don't have one
    // TODO: add new connections to DB
    // TODO: check if we already have a process for the process ID and if not add it
  }
}

const getNodes = () => 
  all(`SELECT * FROM nodes`)
  .then(res => {
    return res.map(v => ({...v, connections: []})) // TODO: get connections from relevant DB
  })

module.exports = {init, addNodes, addConnections, getNodes}