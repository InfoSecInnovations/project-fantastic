const schema = [
  `CREATE TABLE IF NOT EXISTS nodes(
    node_id INTEGER PRIMARY KEY,
    mac TEXT UNIQUE,
    vendor TEXT,
    hostname TEXT,
    date INTEGER,
    os TEXT
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
    local_port INTEGER,
    remote_port INTEGER,
    state TEXT,
    date INTEGER,
    FOREIGN KEY (from_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE,
    FOREIGN KEY (to_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE,
    FOREIGN KEY (process_id)
      REFERENCES processes (process_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS ips(
    ip_id INTEGER PRIMARY KEY,
    ip TEXT,
    node_id INTEGER,
    date INTEGER,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE
  )`
]

module.exports = schema