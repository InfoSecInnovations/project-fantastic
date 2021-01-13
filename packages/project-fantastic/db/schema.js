const schema = [
  `PRAGMA journal_mode = WAL;`,
  `CREATE TABLE IF NOT EXISTS nodes(
    node_id INTEGER PRIMARY KEY,
    hostname TEXT,
    date INTEGER,
    first_date INTEGER,
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
    first_date INTEGER,
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
    first_date INTEGER,
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
  `CREATE TABLE IF NOT EXISTS action_history(
    action_id INTEGER PRIMARY KEY,
    action TEXT,
    function TEXT,
    label TEXT,
    result TEXT,
    data TEXT,
    date INTEGER,
    filter INTEGER,
    node_id INTEGER,
    user_id BLOB,
    test_id INTEGER,
    story_id INTEGER,
    FOREIGN KEY (node_id)
      REFERENCES nodes (node_id)
      ON DELETE CASCADE,
    FOREIGN KEY (test_id)
      REFERENCES test_history (test_id)
      ON DELETE CASCADE,
    FOREIGN KEY (story_id)
      REFERENCES story_history (story_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS quest_history(
    quest_id INTEGER PRIMARY KEY,
    quest TEXT,
    rows TEXT,
    date INTEGER,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS test_history(
    test_id INTEGER PRIMARY KEY,
    test TEXT,
    results TEXT,
    parameters TEXT,
    date INTEGER,
    user_id BLOB,
    quest_id INTEGER,
    story_id INTEGER,
    FOREIGN KEY (quest_id)
      REFERENCES quest_history (quest_id)
      ON DELETE CASCADE,
    FOREIGN KEY (story_id)
      REFERENCES story_history (story_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS command_history(
    command_id INTEGER PRIMARY KEY,
    command TEXT,
    status INTEGER,
    date INTEGER
  )`,
  `CREATE TABLE IF NOT EXISTS approval_history(
    approval_id INTEGER PRIMARY KEY,
    test_id INTEGER,
    approved INTEGER,
    user_id BLOB,
    FOREIGN KEY (test_id)
      REFERENCES test_history (test_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS story_history(
    story_id INTEGER PRIMARY KEY,
    story TEXT,
    story_node_id TEXT,
    rows TEXT,
    date INTEGER,
    user_id TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS all_history(
    history_id INTEGER PRIMARY KEY,
    event_type TEXT,
    event_id INTEGER,
    date INTEGER,
    user_id BLOB
  )`,
  `CREATE TABLE IF NOT EXISTS favorites(
    favorite_id INTEGER PRIMARY KEY,
    history_id INTEGER,
    user_id BLOB,
    sorting INTEGER,
    FOREIGN KEY (history_id)
      REFERENCES all_history (history_id)
      ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS action_data(
    action_data_id INTEGER PRIMARY KEY,
    action TEXT,
    function TEXT,
    label TEXT,
    data TEXT,
    user_id TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS completed_story_nodes(
    completed_node_id INTEGER PRIMARY KEY,
    story TEXT,
    story_node_id TEXT,
    date INTEGER
    user_id BLOB
  )`
]

module.exports = schema