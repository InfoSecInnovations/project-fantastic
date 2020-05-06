const schema = [
  `CREATE TABLE IF NOT EXISTS nodes(
    node_id INTEGER PRIMARY KEY,
    hostname TEXT,
    date INTEGER,
    os TEXT,
    important INTEGER,
    access TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS processes(
    process_id INTEGER PRIMARY KEY,
    node_id INTEGER,
    pid INTEGER,
    name TEXT,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE
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
  )`,
  `CREATE TABLE IF NOT EXISTS macs(
    mac_id INTEGER PRIMARY KEY,
    mac TEXT,
    vendor TEXT,
    node_id INTEGER,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS results(
    result_id INTEGER PRIMARY KEY,
    action TEXT,
    function TEXT,
    key TEXT,
    data TEXT,
    date INTEGER,
    node_id INTEGER,
    user_id TEXT,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS quest_history(
    quest_id INTEGER PRIMARY KEY,
    quest TEXT,
    results TEXT,
    date INTEGER,
    user_id TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS test_history(
    test_id INTEGER PRIMARY KEY,
    test TEXT,
    results TEXT,
    parameters TEXT,
    date INTEGER,
    user_id TEXT
  )`
]

module.exports = schema